# CommitQuality UI Tests

> Testes E2E (UI) da aplicação CommitQuality com Cypress

Autora: Lilian Kasprzak  
Função: Analista de QA  
Data: Outubro 2025

---

## Sobre o Projeto

Este repositório contém os testes de interface (UI) da aplicação CommitQuality (Cypress). Os cenários estão documentados em Gherkin (.txt) e as specs usam comandos customizados e boas práticas de organização.

### Objetivos
- Validar fluxos principais de UI
- Manter cenários claros (Gherkin) e código reutilizável
- Facilitar execução local e em CI

---

## Estrutura do Projeto

```
cypress-commitquality-tests/
├── cypress/
│   ├── e2e/
│   │   ├── exercicio2_commitquality_cenarios/   # Cenários Gherkin (.txt)
│   │   └── exercicio2_commitquality_tests/      # Testes UI (.cy.js)
│   ├── fixtures/
│   │   ├── data-testids.json                    # Data-testids da aplicação
│   │   └── test-file.pdf                        # Arquivo de teste (upload/download)
│   └── support/
│       ├── e2e.js                               # Setup global
│       └── commands-exercicio2.js               # Comandos customizados
├── cypress.config.js
├── package.json
└── README.md
```

---

## Instalação

Pré-requisitos: Node.js 18+ e npm.

```bash
# 1. Clone
git clone <url-do-repo>
cd cypress-commitquality-tests

# 2. Instale
yarn install || npm install
```

---

## Execução

Modo interativo (UI):
```bash
npm run cypress:open
```

Headless (CLI):
```bash
npm run test:ui
```

---

## Contato

Lilian Kasprzak  
Analista de QA

---

## Licença

Uso educacional e demonstração de automação de testes.
