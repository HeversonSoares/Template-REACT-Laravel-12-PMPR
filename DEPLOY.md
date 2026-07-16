# Guia de Deploy, Compilação e Inicialização

Este documento detalha como inicializar o projeto localmente e como compilar os assets para deploy.

## 🚀 Como Inicializar o Projeto Localmente (Docker)

Para subir os containers da aplicação (BFF PHP + React e Banco de Dados PostgreSQL) no seu ambiente de desenvolvimento:

1. **Subir os containers:**
   ```bash
   docker compose up -d
   ```
   *Nota: Caso precise reconstruir as imagens, utilize `docker compose up --build -d`.*

2. **Acessar o projeto:**
   * **URL da Aplicação:** [http://localhost:28432](http://localhost:28432)
   * **Servidor de Dev do Vite:** Porta `5173` (rodando internamente)
   * **Banco de Dados (PostgreSQL):** Porta `25432`

3. **Desligar os containers:**
   ```bash
   docker compose down
   ```

---

## Onde e Como Executar o Build

O processo de compilação dos arquivos React (utilizando Vite) deve ser executado no diretório raiz do projeto:

```bash
/home/soares/projects/template-react
```

### Comando de Compilação

Para compilar os assets para produção, execute o seguinte comando no terminal:

```bash
npm run build
```

Este comando gerará os arquivos otimizados e minificados dentro do diretório `public/build`.

---

## Solução de Problemas: Erro de Permissão (EACCES)

Se você encontrar um erro de permissão ao executar o build (comumente causado pela pasta `public/build` pertencer ao usuário `root`), siga um dos métodos abaixo:

### Método 1: Alterar a propriedade da pasta (Recomendado se tiver acesso sudo)
Execute o comando abaixo para transferir a propriedade da pasta para o seu usuário (`soares`):

```bash
sudo chown -R soares:soares public/build
```

### Método 2: Recriar a pasta (Se não lembrar/tiver a senha de sudo)
Como você é proprietário da pasta pai `public/`, você pode renomear a pasta antiga e criar uma nova sem precisar de privilégios de administrador:

1. Renomeie a pasta antiga:
   ```bash
   mv public/build public/build_old
   ```
2. Crie a nova pasta que pertencerá ao seu usuário:
   ```bash
   mkdir public/build
   ```
3. Execute o build novamente:
   ```bash
   npm run build
   ```
