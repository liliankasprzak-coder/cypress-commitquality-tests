// Cenários: Tela Practice API
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar requisições API na prática", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-api"]').should("be.visible").click();
    cy.waitDemo();
    cy.url().should("include", "/practice-api");
  });
  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-api");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();
    cy.url().should("not.include", "/practice-api");
    cy.log("Link Products clicado");
  });
  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-api");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();
    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });
  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-api");
    cy.contains("a", "Practice").click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });
  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-api");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();
    cy.log("Link Learn clicado");
  });
  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-api");
    cy.contains("a", "Login").click();
    cy.waitDemo();
    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });
  it("Cenário 6: Executar uma Requisição GET", () => {
    cy.url().should("include", "/practice-api");
    cy.get("h2").contains("API calls").should("be.visible");
    cy.get('button[data-testid="get-button"]').click();
    cy.waitDemo();
    cy.contains("Status Code: 200").should("be.visible");
    cy.log("Status Code 200 exibido");
    cy.get("pre").should("be.visible").and("contain", '"userId": 1');
    cy.get("pre").should("contain", '"id": 1');
    cy.get("pre").should("contain", '"title": "delectus aut autem"');
    cy.get("pre").should("contain", '"completed": false');
    cy.log("Requisição GET executada e resposta JSON validada");
  });
});
