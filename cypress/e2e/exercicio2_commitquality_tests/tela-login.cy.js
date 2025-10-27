// Cenários: Tela Login
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar funcionalidades da tela de login", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
  });
  it("Cenário 1: Validar acesso a página", () => {
    cy.navegarPara("login");
    cy.location("pathname").should("eq", "/login");
    cy.url().should("include", "commitquality.com");
    cy.get("input").should("exist");
    cy.get("button").should("exist");
  });
  it("Cenário 2: Validar se a URL está correta", () => {
    cy.navegarPara("login");
    cy.url().should("include", "/login");
    cy.url().should("include", "commitquality.com");
  });
  it("Cenário 3: Validar refresh de tela com o método (Botão refresh)", () => {
    cy.navegarPara("login");
    cy.reload();
    cy.url().should("include", "/login");
    cy.get("input").should("exist");
    cy.get("button").should("exist");
  });
  it("Cenário 4: Validar refresh de tela com o método (F5)", () => {
    cy.navegarPara("login");
    cy.reload();
    cy.url().should("include", "/login");
    cy.get("input").should("exist");
    cy.get("button").should("exist");
  });
  it("Cenário 5: Validar refresh de tela com o método (Ctrl+R)", () => {
    cy.navegarPara("login");
    cy.get("body").type("{ctrl}r");
    cy.wait(1000);
    cy.url().should("include", "/login");
    cy.get("body").should("be.visible");
  });
  it("Cenário 6: Validar a responsividade da tela", () => {
    cy.navegarPara("login");
    cy.testarResponsividade("body");
  });
  it("Cenário 7: Validar o layout da tela de login", () => {
    cy.navegarPara("login");
    cy.get("input").should("exist");
    cy.get("button").should("exist");
  });
  it("Cenário 8: Realizar o login com sucesso", () => {
    cy.navegarPara("login");
    cy.get("input")
      .first()
      .then(($campo) => {
        cy.preencherUsuarioFaker($campo);
      });
    cy.waitDemo();
    cy.get('input[type="password"]').then(($campo) => {
      cy.preencherSenhaFaker($campo);
    });
    cy.waitDemo();
    cy.get("button").first().click();
    cy.waitDemo();
  });
  it("Cenário 9: Validar campos obrigatórios", () => {
    cy.navegarPara("login");
    cy.getFlexivel("login-button", "login-button", "button").first().click();
    cy.url().should("include", "/login");
  });
  it("Cenário 10: Preencher somente o campo Username", () => {
    cy.navegarPara("login");
    cy.get("input")
      .first()
      .then(($campo) => {
        cy.preencherUsuarioFaker($campo);
      });
    cy.waitDemo();
    cy.get('input[type="password"]').clear();
    cy.get("button").first().click();
    cy.waitDemo();
  });
  it("Cenário 11: Preencher somente o Password", () => {
    cy.navegarPara("login");
    cy.get("input").first().clear();
    cy.waitDemo();
    cy.get('input[type="password"]').then(($campo) => {
      cy.preencherSenhaFaker($campo);
    });
    cy.waitDemo();
    cy.get("button").first().click();
    cy.waitDemo();
  });
});
