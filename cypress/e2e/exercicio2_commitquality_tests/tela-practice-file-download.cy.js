// Cenários: Tela Practice File Download
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar File Download", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-file-download"]').should("exist").click();
    cy.url().should("include", "/practice-file-download");
  });

  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice-file-download");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", "Practice").click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });

  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-file-download");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-file-download");
    cy.log("Voltou para a página Practice");
  });

  it("Cenário 7: Validar File Download", () => {
    cy.log("File Download localizado");
    cy.contains("button", "Download File").click();
    cy.log("Botão Download File clicado");
    const downloadsFolder = Cypress.config("downloadsFolder");
    const fileName = "dummy_file.txt";
    cy.readFile(`${downloadsFolder}/${fileName}`, { timeout: 10000 }).should(
      "exist",
    );
    cy.log("Arquivo baixado com sucesso");
  });
});
