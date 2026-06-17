# BookHub
Aplicação frontend em React + TypeScript para gerenciar livros.

## Funcionalidades

- Listagem de livros
- Cadastro de livro
- Edição de livro
- Remoção de livro
- Busca por título, autor e editora
- Feedback visual de sucesso e erro

## Tecnologias

- React 18
- TypeScript
- Vite

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm
- Backend do BookHub rodando em http://localhost:4000

## Configuração

1. Instale as dependências:
   npm install

2. Configure as variáveis de ambiente no arquivo .env:
   VITE_API_BASE_URL=http://localhost:4000

3. Inicie o projeto em modo de desenvolvimento:
   npm run dev

4. Acesse no navegador:
   http://localhost:5173

## Scripts

- npm run dev: inicia servidor de desenvolvimento
- npm run build: gera build de produção
- npm run preview: serve o build localmente

## Integração com API

A aplicação usa o valor de VITE_API_BASE_URL para montar as requisições HTTP.

Observação importante:
- O vite.config.ts tem proxy para rotas /api no desenvolvimento.
- Se você quiser usar o proxy, ajuste VITE_API_BASE_URL para /api.
- Se quiser apontar direto para o backend, use http://localhost:4000.

## Estrutura do projeto

- src/components: componentes de interface (formulário, lista, busca e mensagens)
- src/pages: páginas da aplicação
- src/services: camada de comunicação com API
- src/types: tipagens de domínio

## Fluxo da tela principal

- Aba Cadastrados: lista livros e permite editar/remover
- Aba Adicionar: cadastra novo livro
- Ao clicar em editar, o formulário é preenchido com os dados do livro

## Melhorias futuras

- Validação de formulário mais robusta
- Testes unitários e de integração
- Paginação de resultados
- Estado global para cache de dados
