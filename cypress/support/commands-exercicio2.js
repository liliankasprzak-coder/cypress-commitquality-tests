// Comandos customizados para os testes do CommitQuality
// (cópia para o repositório de UI)

const { faker } = require('@faker-js/faker');
faker.locale = 'pt_BR';

Cypress.Commands.add('visitCommitQuality', (path = '') => {
  const baseUrl = 'https://commitquality.com';
  cy.visit(`${baseUrl}${path}`);
});

Cypress.Commands.add('preencherEmailFaker', (selector) => {
  const emailFake = faker.internet.email();
  cy.get(selector).clear().type(emailFake);
  return cy.wrap(emailFake);
});

Cypress.Commands.add('preencherSenhaFaker', (selector) => {
  const senhaFake = faker.internet.password(12);
  cy.get(selector).clear().type(senhaFake);
  return cy.wrap(senhaFake);
});

Cypress.Commands.add('preencherNomeFaker', (selector) => {
  const nomeFake = faker.person.fullName();
  cy.get(selector).clear().type(nomeFake);
  return cy.wrap(nomeFake);
});

Cypress.Commands.add('preencherUsuarioFaker', (selector) => {
  const usuarioFake = faker.internet.username();
  cy.get(selector).clear().type(usuarioFake);
  return cy.wrap(usuarioFake);
});

Cypress.Commands.add('preencherTelefoneFaker', (selector) => {
  const telefoneFake = faker.phone.number('(##) #####-####');
  cy.get(selector).clear().type(telefoneFake);
  return cy.wrap(telefoneFake);
});

Cypress.Commands.add('preencherCpfFaker', (selector) => {
  const cpfFake = faker.string.numeric('###.###.###-##');
  cy.get(selector).clear().type(cpfFake);
  return cy.wrap(cpfFake);
});

Cypress.Commands.add('preencherEnderecoFaker', (selector) => {
  const enderecoFake = faker.location.streetAddress();
  cy.get(selector).clear().type(enderecoFake);
  return cy.wrap(enderecoFake);
});

Cypress.Commands.add('preencherCidadeFaker', (selector) => {
  const cidadeFake = faker.location.city();
  cy.get(selector).clear().type(cidadeFake);
  return cy.wrap(cidadeFake);
});

Cypress.Commands.add('preencherEmpresaFaker', (selector) => {
  const empresaFake = faker.company.name();
  cy.get(selector).clear().type(empresaFake);
  return cy.wrap(empresaFake);
});

Cypress.Commands.add('preencherTextoFaker', (selector, tipo = 'paragraph') => {
  let textoFake;
  switch (tipo) {
    case 'sentence':
      textoFake = faker.lorem.sentence();
      break;
    case 'word':
      textoFake = faker.lorem.word();
      break;
    default:
      textoFake = faker.lorem.paragraph();
  }
  cy.get(selector).clear().type(textoFake);
  return cy.wrap(textoFake);
});

Cypress.Commands.add('preencherProdutoFaker', (selector) => {
  const produtoFake = faker.commerce.productName();
  cy.get(selector).clear().type(produtoFake);
  return cy.wrap(produtoFake);
});

Cypress.Commands.add('preencherPrecoFaker', (selector) => {
  const precoFake = faker.commerce.price({ min: 10, max: 1000, dec: 2 });
  cy.get(selector).clear().type(precoFake);
  return cy.wrap(precoFake);
});

Cypress.Commands.add('loginComFaker', () => {
  const dadosLogin = {
    email: faker.internet.email(),
    senha: faker.internet.password(12),
    usuario: faker.internet.username()
  };
  return cy.wrap(dadosLogin);
});

Cypress.Commands.add('clickRapido', (selector) => {
  cy.get(selector).should('be.visible').click();
});

Cypress.Commands.add('validarVisivel', (selector) => {
  cy.get(`[data-testid="${selector}"]`).should('be.visible');
});
