# Estrutura de testes

Esta pasta centraliza os testes automatizados do projeto com Jest + Testing Library.

## Subpastas

- components: testes de componentes React (renderizacao, interacao e acessibilidade)
- hooks: testes de hooks customizados
- utils: testes de funcoes puras e validacoes
- state: testes de reducers, actions e selectors
- integration: fluxos de tela com multiplos modulos
- setup: setup global do Jest, mocks de browser e polyfills
- fixtures: dados fixos reutilizaveis para cenarios
- factories: geradores de dados de teste (builders)
- helpers: utilitarios de teste (render com providers, wrappers)

## Convencoes

- Nome de arquivo: *.test.ts ou *.test.tsx
- Componentes: preferir *.test.tsx
- Testes de BVA3: usar sufixo *.bva3.test.ts
- Evitar snapshots para formularios complexos
- Priorizar testes de regra de negocio antes de testes de UI
