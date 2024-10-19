# Lumi Fullstack Developer Test

## Descrição do Projeto

Este projeto foi desenvolvido como parte de um teste prático para o cargo de Desenvolvedor(a) Full Stack na Lumi. Ele consiste em uma aplicação que permite a extração de dados de faturas de energia elétrica em formato PDF, armazena essas informações em um banco de dados PostgreSQL e exibe os resultados em uma interface web utilizando React no frontend e Node.js no backend.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Frontend:** React.js, Axios
- **Extração de Dados de PDFs:** `pdf-parse`
- **ORM:** Sequelize

## Funcionalidades

1. **Extração de Dados de PDFs**

   - O backend realiza a extração de informações relevantes de faturas de energia elétrica, como `clientNumber`, `referenceMonth`, `energyConsumed`, e `totalAmount` usando o pacote `pdf-parse`.
   - Suporta diferentes tipos de faturas, como faturas de luz e água, com mapeamento dinâmico.

2. **Armazenamento no Banco de Dados**

   - As informações extraídas são armazenadas no banco de dados PostgreSQL usando Sequelize.
   - O modelo `Invoice` foi definido para armazenar os campos relevantes.

3. **Frontend para Upload e Visualização**
   - O frontend em React permite o upload das faturas e exibe os dados extraídos de maneira amigável.
   - O gráfico de consumo de energia é gerado dinamicamente para exibir o consumo por mês.

## Estrutura do Projeto

\`\`\`bash
root/
│
├── backend/
│ ├── src/
│ │ ├── routes.js # Rotas da API
│ │ ├── app.js # Configuração principal do backend
│ │ ├── utils/
│ │ │ └── pdfExtractor.js# Lógica para extração de dados de PDFs
│ │ └── models/
│ │ └── invoice.js # Modelo da fatura (Invoice) no banco de dados
│ ├── config/
│ │ └── database.js # Configurações de conexão com o banco de dados
│ └── .env # Variáveis de ambiente (ver exemplo abaixo)
├── frontend/
│ ├── src/
│ │ ├── App.js # Componente principal da aplicação frontend
│ │ ├── UploadFatura.js # Componente para upload de faturas
│ │ └── EnergyConsumptionChart.js # Gráfico de consumo de energia
│ └── public/
│ └── index.html # Template do frontend
└── README.md # Documentação do projeto
\`\`\`

## Configuração do Ambiente

1. **Configuração do Backend**

   No diretório `backend`, você deve configurar as variáveis de ambiente no arquivo `.env`. Veja o exemplo abaixo:

   \`\`\`bash
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=nome_do_banco
   DB_PORT=5432
   \`\`\`

2. **Configuração do Frontend**

   No diretório `frontend`, instale as dependências e execute a aplicação.

   \`\`\`bash
   cd frontend
   npm install
   npm start
   \`\`\`

## Executando o Projeto

### Backend

1. Acesse o diretório `backend` e instale as dependências:

   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. Inicie o servidor backend:

   \`\`\`bash
   npm start
   \`\`\`

3. O backend estará rodando na porta 5000.

### Frontend

1. No diretório `frontend`, instale as dependências:

   \`\`\`bash
   cd frontend
   npm install
   \`\`\`

2. Inicie o frontend:

   \`\`\`bash
   npm start
   \`\`\`

3. O frontend estará acessível em \`http://localhost:3000\`.

## Testes Automatizados

### Testes Backend

Os testes no backend garantem que a extração dos dados das faturas esteja funcionando corretamente, bem como a inserção e a recuperação de dados do banco de dados.

1. Para rodar os testes:

   \`\`\`bash
   cd backend
   npm test
   \`\`\`

### Testes Frontend

Os testes no frontend garantem que a interface gráfica esteja funcionando corretamente, especialmente o upload de faturas e a exibição dos dados extraídos.

1. Para rodar os testes:
   cd frontend
   npm test
