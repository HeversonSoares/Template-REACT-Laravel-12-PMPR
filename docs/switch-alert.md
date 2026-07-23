# Implementação do SwitchAlert (Back ao Front)

O `SwitchAlert` é o nosso componente padrão para exibir alertas, mensagens de sucesso, informações e confirmações de ações na interface de usuário. Ele não se comunica diretamente com o backend, mas atua como o receptor final das mensagens devolvidas pelas APIs.

Este documento explica como padronizar o fluxo de ponta a ponta: do envio da requisição pelo React, processamento no Backend (Laravel), até a exibição amigável do alerta na tela.

---

## 1. O Padrão no Backend (Laravel)

O backend (Controller) é responsável por executar a lógica de negócios e deve **sempre** retornar mensagens amigáveis em formato JSON. Não deixe que erros genéricos de SQL ou do sistema cheguem ao usuário.

### Estrutura Recomendada

Sempre que uma ação terminar (sucesso ou falha), o JSON de resposta deve conter a chave `message`. 

#### Exemplo de Sucesso (ExemploController)
```php
// app/Http/Controllers/ExemploController.php
public function limparCache(Request $request): JsonResponse
{
    // ... lógica para limpar o cache ...

    // Retorna HTTP 200 (OK) com uma mensagem clara
    return response()->json([
        'message' => 'Cache limpo. Próxima requisição buscará dados atualizados.',
    ]);
}
```

#### Exemplo de Falha Tratada
```php
public function acaoCritica(Request $request): JsonResponse
{
    try {
        // ... lógica que pode falhar ...
    } catch (\Exception $e) {
        // Registra o erro internamente para debug
        Log::error('Erro na ação crítica', ['erro' => $e->getMessage()]);

        // Retorna HTTP 500 ou 422 com uma mensagem amigável para o usuário
        return response()->json(
            ['message' => 'Não foi possível completar a ação. Tente novamente em instantes.'],
            500
        );
    }
}
```

---

## 2. A Chamada no Frontend (React)

No frontend, você deve ter um estado local para controlar o alerta (aberto/fechado, tipo de ícone, título e a própria mensagem). Você faz a requisição HTTP (usando `axios` ou `fetch`) e, dependendo da resposta, alimenta este estado.

### Exemplo de Implementação em uma Página/Componente

```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { SwitchAlert } from '@/components/SwitchAlert';
import { Button } from '@/components/ui/button';

export function MinhaPagina() {
  // 1. Criação do estado que controla o alerta
  const [alertConfig, setAlertConfig] = useState({
    open: false,
    type: 'info', // 'success', 'error', 'confirm', 'info', 'warning'
    title: '',
    message: ''
  });

  // Função auxiliar para fechar o alerta
  const closeAlert = () => setAlertConfig(prev => ({ ...prev, open: false }));

  // 2. Função que aciona a API
  const handleLimparCache = async () => {
    try {
      // Faz a chamada para a rota do Laravel
      const response = await axios.delete('/api/exemplo/cache?unidade=BPM01');
      
      // Abre o alerta de SUCESSO utilizando a 'message' que veio do Backend
      setAlertConfig({
        open: true,
        type: 'success',
        title: 'Operação Concluída',
        message: response.data.message 
      });

    } catch (error) {
      // Tenta pegar a mensagem de erro vinda do backend (ex: erro 500 tratado)
      // Se não houver, exibe uma mensagem genérica
      const erroMsg = error.response?.data?.message || 'Ocorreu um erro inesperado ao contactar o servidor.';
      
      // Abre o alerta de ERRO
      setAlertConfig({
        open: true,
        type: 'error',
        title: 'Falha na Operação',
        message: erroMsg
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Cache</h1>
      
      <Button onClick={handleLimparCache}>
        Limpar Cache Agora
      </Button>

      {/* 3. Inserção do Componente SwitchAlert na tela */}
      <SwitchAlert
        open={alertConfig.open}
        onOpenChange={closeAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={closeAlert} // Ao clicar no botão principal, apenas fecha
      />
    </div>
  );
}
```

---

## 3. Tipos de Alerta Disponíveis

A propriedade `type` do `<SwitchAlert />` altera automaticamente o estilo visual (cores dos botões) e os ícones:

*   `'success'`: Ícone verde de check, botões verdes. (Ideal para ações concluídas)
*   `'error'`: Ícone vermelho de X, botões vermelhos. (Ideal para catch block)
*   `'info'`: Ícone azul informativo, botões azuis. (Padrão)
*   `'warning'`: Ícone amarelo de atenção, botões amarelos.
*   `'confirm'`: Usa o estilo de warning, mas por padrão exibe o botão "Cancelar".

## 4. Dicas de Ouro

1.  **Nunca** passe o objeto de erro completo (ex: `$e->getMessage()` no Laravel) direto para o frontend se ele contiver informações sensíveis de banco de dados ou estrutura.
2.  Para diálogos de **confirmação** antes de enviar algo para a API, use o `type="confirm"`, defina o texto (`message="Tem certeza que deseja apagar?"`) e coloque a requisição `axios` dentro da propriedade `onConfirm` do `<SwitchAlert />`.
