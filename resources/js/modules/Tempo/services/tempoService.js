// =============================================================================
// TEMPO SERVICE — Camada de acesso ao BFF (Backend for Frontend)
// =============================================================================
// Este service NÃO chama a API externa diretamente.
// Ele chama o endpoint do próprio BFF Laravel (/api/tempo), que por sua vez
// é responsável por se comunicar com a Open-Meteo.
//
// Fluxo correto da arquitetura BFF:
//   React (fetch) → /api/tempo (Laravel) → open-meteo.com (API externa)
//
// Vantagens desta abordagem:
//   - A URL da API externa fica oculta ao navegador.
//   - Permite adicionar autenticação, cache ou rate-limiting no backend.
//   - O frontend sempre fala com sua própria origem (/api/*).
//
// Estrutura da camada de service:
//   - Centraliza todas as chamadas HTTP do módulo.
//   - Não contém lógica de UI (sem useState, sem JSX).
//   - Lança erros para que a camada de UI trate e exiba ao usuário.
//   - Exporta funções assíncronas nomeadas (não default).
// =============================================================================

/**
 * Busca a previsão do tempo completa para uma cidade.
 *
 * Chama o endpoint BFF: GET /api/tempo?cidade={cidade}
 * O Laravel resolve as coordenadas e a previsão, retornando JSON estruturado.
 *
 * @param {string} cidade - Nome da cidade a pesquisar.
 * @returns {Promise<{ local: LocalData, previsao: TempoData }>}
 * @throws {Error} Quando a cidade não é encontrada ou há falha na requisição.
 *
 * @typedef {Object} LocalData
 * @property {string} nome   - Nome da cidade encontrada.
 * @property {string} estado - Estado/região da cidade.
 * @property {string} pais   - Código do país (ex: 'BR').
 *
 * @typedef {Object} TempoData
 * @property {TempoAtual}  atual - Condições meteorológicas atuais.
 * @property {TempoHora[]} horas - Previsão horária para as próximas 24h.
 * @property {TempoDia[]}  dias  - Previsão diária para os próximos 7 dias.
 *
 * @example
 * const { local, previsao } = await buscarTempo('Curitiba');
 * console.log(local.nome);             // 'Curitiba'
 * console.log(previsao.atual.temperatura); // 22
 */
export async function buscarTempo(cidade) {
    const params = new URLSearchParams({ cidade });

    // ── Chama o BFF (/api/tempo) — não a API externa diretamente ─────────────
    const resposta = await fetch(`/api/tempo?${params}`, {
        method:      'GET',
        credentials: 'same-origin', // inclui cookies de sessão (padrão do projeto)
        headers: {
            'Accept':           'application/json',
            'X-Requested-With': 'XMLHttpRequest', // identifica como requisição AJAX
        },
    });

    const dados = await resposta.json();

    // ── Trata erros HTTP retornados pelo Laravel (404, 502, etc.) ─────────────
    if (!resposta.ok) {
        throw new Error(dados.message ?? `Erro HTTP ${resposta.status}`);
    }

    // ── Transforma os dados brutos da previsão em estrutura amigável p/ UI ────
    return {
        local:    dados.local,
        previsao: transformarPrevisao(dados.previsao),
    };
}

// =============================================================================
// FUNÇÕES AUXILIARES (privadas — não exportadas)
// =============================================================================

/**
 * Transforma a resposta bruta da Open-Meteo (retornada pelo BFF)
 * em uma estrutura amigável e tipada para a UI.
 *
 * @param {Object} dados - Resposta bruta da API Open-Meteo via BFF.
 * @returns {{ atual: TempoAtual, horas: TempoHora[], dias: TempoDia[] }}
 */
function transformarPrevisao(dados) {
    const { current, hourly, daily } = dados;

    // ── Atual ─────────────────────────────────────────────────────────────────
    const atual = {
        temperatura:      Math.round(current.temperature_2m),
        sensacaoTermica:  Math.round(current.apparent_temperature),
        umidade:          current.relative_humidity_2m,
        ventoKmh:         Math.round(current.wind_speed_10m),
        precipitacao:     current.precipitation,
        coberturaNuvens:  current.cloud_cover,
        indiceUV:         current.uv_index,
        codigoClima:      current.weather_code,
        descricao:        descreverClima(current.weather_code),
        icone:            iconeClima(current.weather_code),
    };

    // ── Horária (próximas 24h a partir de agora) ──────────────────────────────
    const agora = new Date();
    const horas = hourly.time
        .map((hora, i) => ({
            hora:               hora,
            temperatura:        Math.round(hourly.temperature_2m[i]),
            probabilidadeChuva: hourly.precipitation_probability[i] ?? 0,
            codigoClima:        hourly.weather_code[i],
            icone:              iconeClima(hourly.weather_code[i]),
        }))
        .filter((h) => new Date(h.hora) >= agora)
        .slice(0, 24);

    // ── Diária (7 dias) ───────────────────────────────────────────────────────
    const dias = daily.time.map((dia, i) => ({
        data:                  dia,
        diaSemana:             diaSemana(dia),
        temperaturaMax:        Math.round(daily.temperature_2m_max[i]),
        temperaturaMin:        Math.round(daily.temperature_2m_min[i]),
        precipitacaoTotal:     daily.precipitation_sum[i],
        probabilidadeChuvaMax: daily.precipitation_probability_max[i] ?? 0,
        indiceUVMax:           daily.uv_index_max[i],
        ventoMaxKmh:           Math.round(daily.wind_speed_10m_max[i]),
        codigoClima:           daily.weather_code[i],
        descricao:             descreverClima(daily.weather_code[i]),
        icone:                 iconeClima(daily.weather_code[i]),
    }));

    return { atual, horas, dias };
}

/**
 * Retorna o nome do dia da semana em português para uma data ISO.
 * @param {string} dataISO - Data no formato 'YYYY-MM-DD'.
 * @returns {string}
 */
function diaSemana(dataISO) {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const data = new Date(`${dataISO}T12:00:00`);
    return dias[data.getDay()];
}

/**
 * Mapeia o WMO Weather Interpretation Code para uma descrição em português.
 * Referência: https://open-meteo.com/en/docs#weathervariables
 * @param {number} codigo - Código WMO do clima.
 * @returns {string}
 */
function descreverClima(codigo) {
    const mapa = {
        0:  'Céu limpo',
        1:  'Predominantemente limpo',
        2:  'Parcialmente nublado',
        3:  'Nublado',
        45: 'Neblina',
        48: 'Neblina com gelo',
        51: 'Chuvisco fraco',
        53: 'Chuvisco moderado',
        55: 'Chuvisco intenso',
        61: 'Chuva fraca',
        63: 'Chuva moderada',
        65: 'Chuva forte',
        71: 'Neve fraca',
        73: 'Neve moderada',
        75: 'Neve forte',
        77: 'Grãos de neve',
        80: 'Pancadas de chuva fracas',
        81: 'Pancadas de chuva moderadas',
        82: 'Pancadas de chuva fortes',
        85: 'Pancadas de neve fracas',
        86: 'Pancadas de neve fortes',
        95: 'Trovoada',
        96: 'Trovoada com granizo fraco',
        99: 'Trovoada com granizo forte',
    };
    return mapa[codigo] ?? 'Condição desconhecida';
}

/**
 * Mapeia o WMO Weather Interpretation Code para o nome de um ícone Lucide.
 * @param {number} codigo - Código WMO do clima.
 * @returns {string}
 */
function iconeClima(codigo) {
    if (codigo === 0)  return 'Sun';
    if (codigo <= 2)   return 'CloudSun';
    if (codigo === 3)  return 'Cloud';
    if (codigo <= 48)  return 'CloudFog';
    if (codigo <= 55)  return 'CloudDrizzle';
    if (codigo <= 65)  return 'CloudRain';
    if (codigo <= 77)  return 'Snowflake';
    if (codigo <= 82)  return 'CloudRain';
    if (codigo <= 86)  return 'CloudSnow';
    return 'CloudLightning';
}
