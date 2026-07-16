# Receita de Bolo: Como Instalar o Projeto

Siga este passo a passo (a "receita de bolo") para configurar e rodar o projeto localmente após baixá-lo.

## Passo 1: Instalar dependências do Backend (PHP)
No terminal, na raiz do projeto, execute o gerenciador de pacotes do PHP:
```bash
composer install
```

## Passo 2: Instalar dependências do Frontend (Node/React)
Em seguida, instale os pacotes do Node.js:
```bash
npm install
```

## Passo 3: Configurar as Variáveis de Ambiente
Copie o arquivo de exemplo para criar o seu arquivo de configuração local:
```bash
cp .env.example .env
```
*(Lembre-se de abrir o arquivo recém-criado `.env` e configurar as credenciais do seu banco de dados, como `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD`).*

## Passo 4: Gerar a Chave de Criptografia do Laravel
Gere a chave da aplicação que será utilizada por debaixo dos panos pelo Laravel:
```bash
php artisan key:generate
```

## Passo 5: Rodar as Migrações do Banco de Dados
Crie as tabelas necessárias no seu banco de dados configurado no Passo 3:
```bash
php artisan migrate
```
*(Para gerar dados de teste, caso existam seeders, você pode adicionar a flag `--seed`: `php artisan migrate --seed`)*

## Passo 6: Iniciar o Servidor Frontend (Vite)
Para compilar e servir os arquivos do React em tempo real, inicie o Vite (mantenha este terminal aberto):
```bash
npm run dev
```

## Passo 7: Iniciar o Servidor Backend (Laravel)
Abra um **novo terminal** na mesma pasta e inicie o servidor de desenvolvimento do Laravel:
```bash
php artisan serve
```

**Pronto!** O bolo está assado. Agora o seu projeto deve estar acessível pelo navegador, normalmente no endereço `http://localhost:8000`.
