// Cenários: Tela Practice
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar funcionalidades da tela Practice", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
  });

  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Learn", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 4: Clicar em Login", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 5: Validar acesso à página Practice", () => {
    cy.url().should("eq", "https://commitquality.com/practice");
    cy.get("h1, h2").should("exist");
  });

  it("Cenário 2: Validar se a URL está correta", () => {
    cy.url().should("include", "/practice");
    cy.url().should("include", "commitquality.com");
  });

  it("Cenário 3: Validar refresh de tela", () => {
    cy.reload();

    cy.get("h1, h2").should("exist");
    cy.url().should("include", "/practice");
  });

  it("Cenário 4: Validar responsividade da tela", () => {
    cy.testarResponsividade("body");
  });

  it("Cenário 5: Validar layout da tela Practice", () => {
    cy.get("h1, h2, h3").should("exist");
    cy.get("a, button").should("exist");
  });
});
