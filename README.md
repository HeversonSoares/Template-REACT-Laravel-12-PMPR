# Laravel Frontend (BFF) - React SPA Template

Este é um template completo para construir aplicações front-end utilizando **Laravel como BFF (Backend for Frontend)** e **React (SPA com React Router & shadcn/ui)** no lado do cliente.

---

## 🚀 Arquitetura & Tecnologias

- **BFF (Backend for Frontend)**: Laravel 12.x (PHP 8.3) atuando como gateway leve de autenticação e proxy de APIs.
- **Frontend SPA**: React 18.x + Vite (desvinculado do Inertia.js para um fluxo SPA tradicional).
- **Roteamento**: React Router v6 para navegação de páginas sem recarregamento.
- **Design System**: Tailwind CSS v3 + shadcn/ui (Radix UI + Lucide Icons).
- **Gerenciamento de Docker**: Configurado para fácil inicialização com `docker-compose.yml` e `Dockerfile` (PHP 8.3-FPM).

---

## 📂 Estrutura de Diretórios Principal

```text
template-react/
├── app/                       # Camada PHP (BFF Controllers & Services)
│   ├── Http/
│   │   └── Controllers/       # Processamento de autenticação e proxy de requisições
│   └── Services/              # Integração de chamadas HTTP para microsserviços
├── resources/
│   ├── css/
│   │   └── app.css            # Variáveis CSS padrão para shadcn/ui (Light/Dark mode)
│   ├── js/                    # Frontend React SPA
│   │   ├── components/        # Componentes UI gerados pelo shadcn/ui
│   │   ├── lib/
│   │   │   └── utils.js       # Função auxiliar `cn` do shadcn/ui
│   │   ├── pages/             # Páginas (Dashboard, Login, Register)
│   │   ├── App.jsx            # Entrada e definição de rotas com React Router
│   │   └── bootstrap.js       # Configurações globais (Axios, etc.)
│   └── views/
│       └── app.blade.php      # SPA Entrypoint HTML
├── components.json            # Configuração do shadcn/ui
├── tailwind.config.js         # Estilos customizados para o shadcn/ui
├── Dockerfile                 # Configuração do container PHP 8.3-FPM + Node
└── docker-compose.yml         # Orquestração local da aplicação e banco PostgreSQL
```

---

## 🔐 Fluxo de Autenticação Flexível

Configurável via arquivo `.env` do BFF:

1. **Modo A: Autenticação Local**:
   - Controle e validação de usuários localmente no banco de dados do próprio BFF.
2. **Modo B: Autenticação SSO Externa (SIA-Auth)**:
   - Delega o login para um provedor externo (OAuth2/OpenID).
   - O BFF armazena o token recebido de forma segura na sessão do servidor.

*Nota: Em ambos os modos, a comunicação com o cliente React é mantida por meio de session cookies seguros (HttpOnly).*

---

## 🌐 Integração e Consumo de APIs (Padrão SIA)

O BFF consome APIs externas utilizando a Facade `Http` do Laravel sob os seguintes padrões:

- **APIs Internas (SIA)**:
  - Uso de tokens JWT obtidos dinamicamente por intermédio do `Sia-Auth`.
  - Injeção automática dos dados contextuais do usuário logado na sessão (`topo`, `opm_id`, `local_id`, `rg`, `cpf`, `user_id`) nas requisições.
- **APIs de Terceiros (ex: Expresso)**:
  - Envio em formato de formulário (`asForm()`) contendo o payload serializado no campo `params`.

---

## 🛠️ Como Executar Localmente

### 1. Inicializar os Containers
Suba os containers do projeto (a aplicação será construída com PHP 8.3 e Postgres):
```bash
docker compose up --build -d
```

### 2. Acessar a Aplicação
Uma vez iniciado o container, acesse:
- **URL Local**: [http://localhost:28432](http://localhost:28432)
- **Vite Dev Server**: Rodando internamente e disponível na porta `5173`.
