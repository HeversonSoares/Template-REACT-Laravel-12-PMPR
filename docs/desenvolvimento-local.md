# Desenvolvimento Local com Hot Reload no Docker

Este documento descreve como o ambiente de desenvolvimento local está configurado para permitir a atualização automática e instantânea do frontend (**Hot Reloading**) sem a necessidade de recriar containers ou rodar o comando de `build` manualmente a todo momento.

---

## 🛠️ Como Funciona a Inicialização Concorrente

No ambiente de desenvolvimento, precisamos que dois serviços rodem simultaneamente no mesmo container (`template_react_app`):
1. **Laravel Web Server (`php artisan serve`)**: Servindo o backend/BFF na porta `8000` (mapeada para `28432` no host).
2. **Vite Dev Server (`npm run dev`)**: Servindo os assets do frontend (React, CSS, etc.) e o WebSocket do HMR (Hot Module Replacement) na porta `5173`.

Para fazer isso de forma limpa e em um único container, utilizamos o pacote `concurrently` (declarado no `package.json`). O comando configurado no [docker-compose.yml](file:///home/soares/projects/template-react/docker-compose.yml) é:

```yaml
command: >
  sh -c "
  composer install &&
  npm install &&
  php artisan key:generate &&
  php artisan migrate --force &&
  npx concurrently \"php artisan serve --host=0.0.0.0 --port=8000\" \"npm run dev\"
  "
```

---

## ⚙️ Configuração do Vite para Ambiente Docker

Rodar o Vite dentro do Docker exige ajustes específicos de rede e monitoramento de arquivos para que o navegador da sua máquina física consiga se comunicar com o container. 

Essas configurações estão localizadas no arquivo [vite.config.js](file:///home/soares/projects/template-react/vite.config.js):

```javascript
    server: {
        host: '0.0.0.0', // Permite conexões externas ao container
        hmr: {
            host: 'localhost', // Garante que o HMR no navegador aponte para localhost:5173
        },
        watch: {
            usePolling: true, // Força o Vite a verificar alterações via polling (essencial para mounts de volumes)
        },
    },
```

### Explicação dos parâmetros:
* **`host: '0.0.0.0'`**: Por padrão, o Vite ouve apenas em `localhost` (dentro do container). Configurar para `0.0.0.0` permite que ele receba conexões vindas do seu computador (através do mapeamento de porta `5173:5173`).
* **`hmr.host: 'localhost'`**: Indica ao script cliente injetado no seu navegador que o canal de Hot Reload (via WebSocket) está exposto em `localhost` na sua máquina física, em vez de tentar usar o IP interno privado do container.
* **`watch.usePolling: true`**: Sistemas de arquivos compartilhados entre o host e o container (volumes Docker) frequentemente não propagam eventos de alteração de arquivos de forma nativa. O polling garante que o Vite verifique periodicamente por modificações nos arquivos e ative o Hot Reload instantaneamente.

---

## 💻 Fluxo de Trabalho no Dia a Dia

1. **Subir o ambiente**:
   ```bash
   docker compose up -d
   ```
2. **Acessar a aplicação**:
   Acesse [http://localhost:28432](http://localhost:28432) no navegador.
3. **Desenvolver**:
   Edite qualquer componente ou página dentro de `resources/js/`. Assim que você salvar o arquivo, o Vite detectará a mudança por polling e atualizará a interface no navegador de forma instantânea, preservando o estado atual da página (sem recarregamento completo).

---

## 🔍 Solução de Problemas (Troubleshooting)

### As alterações não estão refletindo no navegador
1. **Verifique se o container está rodando e sem erros:**
   ```bash
   docker compose logs app
   ```
2. **Confirme se as portas estão liberadas:**
   Certifique-se de que nenhum outro processo local esteja usando a porta `5173` ou `28432` no seu computador.
3. **Limpe o cache do Vite (se necessário):**
   Se o Vite travar por algum motivo, você pode reiniciar o container para recriar o cache de desenvolvimento:
   ```bash
   docker compose restart app
   ```
