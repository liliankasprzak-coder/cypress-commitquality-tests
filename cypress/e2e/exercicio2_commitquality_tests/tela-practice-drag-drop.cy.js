// Cenários: Tela Practice Drag and Drop
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar Drag and Drop", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-drag-drop"]')
      .should("be.visible")
      .click();
    cy.waitDemo();
    cy.url().should("include", "/practice-drag-and-drop");
  });
  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice-drag-and-drop");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", "Practice").click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });

  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-drag-and-drop");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-drag-and-drop");
    cy.log("Voltou para a página Practice");
  });

  it("Cenário 7: Arrastar e soltar com sucesso", () => {
    cy.get('[data-testid="small-box"]')
      .should("be.visible")
      .and("contain", "Drag me!");
    cy.get('[data-testid="large-box"]')
      .should("be.visible")
      .and("contain", "Drag the small box here.");
    cy.window().then((win) => {
      const dataTransfer = new win.DataTransfer();
      cy.get('[data-testid="small-box"]').trigger("dragstart", {
        dataTransfer,
      });
      cy.get('[data-testid="large-box"]').trigger("dragover", { dataTransfer });
      cy.get('[data-testid="large-box"]').trigger("drop", { dataTransfer });
    });
    cy.waitDemo();
    cy.get('[data-testid="large-box"]').should("contain", "Success!");
  });
});
