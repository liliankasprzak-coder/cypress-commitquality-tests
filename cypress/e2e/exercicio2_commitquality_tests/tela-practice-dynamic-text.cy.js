// Cenários: Tela Practice Dynamic Text
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar Dynamic Text", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-dynamic-text"]').should("be.visible").click();
    cy.waitDemo();
    cy.url().should("include", "/practice-dyanmic-text");
  });
  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-dyanmic-text");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();
    cy.url().should("not.include", "/practice-dyanmic-text");
    cy.log("Link Products clicado");
  });
  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-dyanmic-text");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();
    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });
  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-dyanmic-text");
    cy.contains("a", "Practice").click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });
  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-dyanmic-text");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();
    cy.log("Link Learn clicado");
  });
  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-dyanmic-text");
    cy.contains("a", "Login").click();
    cy.waitDemo();
    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });
  it('Cenário 6: Validar botão "Always visible" está visível', () => {
    cy.get("h1, h2").contains("Dynamic Text").should("be.visible");
    cy.contains("button", "Always visible").should("be.visible");
    cy.log('Botão "Always visible" está visível');
  });
  it('Cenário 7: Validar mudança de estado do botão para "loading"', () => {
    cy.contains("button", "Always visible").should("be.visible");
    cy.contains("button", "Always visible").click();
    cy.contains("button", "loading").should("be.visible");
    cy.log('Botão mudou para estado "loading"');
  });
  it("Cenário 8: Validar texto final após 5 segundos", () => {
    cy.contains("button", "Always visible").should("be.visible");
    cy.contains("button", "Always visible").click();
    cy.contains("button", "loading").should("be.visible");
    cy.contains("button", "I am visible after 5 seconds", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.log("Texto final exibido após 5 segundos");
  });
  it("Cenário 9: Validar fluxo completo de transformação do botão", () => {
    cy.contains("button", "Always visible").should("be.visible");
    cy.log("Estado 1: Always visible");
    cy.contains("button", "Always visible").click();
    cy.contains("button", "loading").should("be.visible");
    cy.log("Estado 2: loading");
    cy.contains("button", "I am visible after 5 seconds", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.log("Estado 3: I am visible after 5 seconds");
    cy.log("Fluxo completo de transformação validado");
  });
});
