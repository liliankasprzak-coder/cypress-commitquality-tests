// Cenários: Tela Practice Accordions
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar funcionalidades dos Accordions na prática", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.getFlexivel("practice-accordions").click();
    cy.url().should("include", "/practice-accordions");
  });

  it("Cenário 1: Validar cliques do Accordion 1", () => {
    cy.get('button[data-testid="accordion-1"]')
      .first()
      .should("be.visible")
      .click();
    cy.waitDemo();
    cy.get('button[data-testid="basic-click"]').should("be.visible").click();
    cy.contains("p", "Button clicked").should("be.visible");
    cy.waitDemo();
    cy.get('button[data-testid="double-click"]')
      .should("be.visible")
      .dblclick();
    cy.contains("p", "Button double clicked").should("be.visible");
    cy.waitDemo();
    cy.get('button[data-testid="right-click"]')
      .should("be.visible")
      .rightclick();
    cy.contains("p", "Button right mouse clicked").should("be.visible");
    cy.waitDemo();
  });

  it("Cenário 2: Validar Radio Buttons do Accordion 2", () => {
    cy.contains("button", "Accordion 2").should("be.visible").click();
    cy.waitDemo();
    cy.get('input[type="radio"][data-testid="option1"]')
      .first()
      .click({ force: true });
    cy.contains("p", "option1 clicked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="radio"][data-testid="option2"]')
      .first()
      .click({ force: true });
    cy.contains("p", "option2 clicked").should("be.visible");
    cy.waitDemo();
  });

  it("Cenário 3: Validar checkboxes do Accordion 3", () => {
    cy.contains("button", "Accordion 3").should("be.visible").click();
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox1"]').check();
    cy.contains("p", "Checkbox 1 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox1"]').uncheck();
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox2"]').check();
    cy.contains("p", "Checkbox 2 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox2"]').uncheck();
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox3"]').check();
    cy.contains("p", "Checkbox 3 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox3"]').uncheck();
    cy.waitDemo();
  });

  it("Cenário 4: Clicar em Products", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice-accordions");
    cy.log("Link Products clicado");
  });

  it("Cenário 5: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 6: Clicar em Practice", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", "Practice").click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });

  it("Cenário 7: Clicar em Learn", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 8: Clicar em Login", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 9: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-accordions");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-accordions");
    cy.log("Voltou para a página Practice");
  });
});
