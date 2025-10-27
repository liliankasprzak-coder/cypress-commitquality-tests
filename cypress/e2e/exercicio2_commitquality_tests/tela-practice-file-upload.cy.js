// Cenários: Tela Practice File Upload
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar File Upload", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-file-upload"]')
      .should("be.visible")
      .click();
    cy.waitDemo();
    cy.url().should("include", "/practice-file-upload");
  });
  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();
    cy.url().should("not.include", "/practice-file-upload");
    cy.log("Link Products clicado");
  });
  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();
    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });
  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", "Practice").click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });
  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();
    cy.log("Link Learn clicado");
  });
  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", "Login").click();
    cy.waitDemo();
    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });
  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-file-upload");
    cy.log("Voltou para a página Practice");
  });
  it("Cenário 7: Validar upload de arquivo com sucesso", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.get('input[data-testid="file-input"]').selectFile(
      "cypress/fixtures/test-file.pdf",
      { force: true },
    );
    cy.wait(500);
    cy.log("Arquivo selecionado");
    cy.get("button")
      .contains("Submit")
      .should("exist")
      .then(($btn) => {
        cy.log("Botão encontrado, clicando...");
        cy.wrap($btn).click({ force: true });
      });
    cy.wait(2000);
    cy.log("Botão Submit clicado");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("File successfully uploaded!");
    });
    cy.log("Alerta de sucesso validado");
  });
  it("Cenário 8: Submeter sem anexar arquivo", () => {
    cy.url().should("include", "/practice-file-upload");
    cy.contains("button", "Submit").click();
    cy.contains("Please select a file to upload.").should("be.visible");
  });
});
