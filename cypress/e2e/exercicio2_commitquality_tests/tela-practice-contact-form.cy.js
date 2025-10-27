// Cenários: Tela Practice Contact Form
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar Contact Us Form", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-contact-form"]')
      .should("be.visible")
      .click();
    cy.waitDemo();
    cy.url().should("include", "/practice-contact-form");
  });
  it("Cenário 1: Clicar em Products", () => {
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();
    cy.url().should("not.include", "/practice-contact-form");
  });
  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-contact-form");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();
    cy.url().should("include", "/add-product");
  });
  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-contact-form");
    cy.contains("a", "Practice").click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
  });
  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-contact-form");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();
  });
  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-contact-form");
    cy.contains("a", "Login").click();
    cy.waitDemo();
    cy.url().should("include", "/login");
  });
  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-contact-form");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-contact-form");
  });
  it("Cenário 7: Preencher somente nome e clicar em Submit", () => {
    cy.get('input[data-testid="name"]').type("João Silva");
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 8: Preencher somente o e-mail e clicar em Submit", () => {
    cy.get('input[data-testid="email"]').type("teste@email.com");
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 9: Preencher somente a data e clicar em Submit", () => {
    cy.get('input[data-testid="dob"]').type("2025-01-15");
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 10: Selecionar somente uma opção e clicar em Submit (Realizado os testes com todas as opções e funcionaram)", () => {
    cy.get('select[data-testid="query-type"]').select("General");
    cy.get('select[data-testid="query-type"]').should("have.value", "General");
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 11: Inserir somente data e clicar em Submit", () => {
    cy.get('input[data-testid="dob"]').type("2025-02-20");
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 12: Selecionar somente o checkbox e clicar em Submit", () => {
    cy.get('input[data-testid="practice-checkbox"]').check();
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
  });
  it("Cenário 13: Não preencher nenhum campo e clicar em Submit", () => {
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Query Type is required").should("be.visible");
    cy.contains("Date of Birth is required").should("be.visible");
    cy.contains("Please check the box to confirm").should("be.visible");
  });
  it("Cenário 14: Preencher todos os campos e clicar em Submit", () => {
    cy.get('input[data-testid="name"]').type("Maria Santos");
    cy.get('input[data-testid="email"]').type("maria@email.com");
    cy.get('select[data-testid="query-type"]').select("General");
    cy.get('input[data-testid="dob"]').type("2025-01-10");
    cy.get('input[data-testid="practice-checkbox"]').check();
    cy.waitDemo();
    cy.get('button[data-testid="submit-button"]').click();
    cy.waitDemo();
    cy.contains("Thanks for contacting us, we will never respond!").should(
      "be.visible",
    );
    cy.log("Formulário enviado com sucesso");
  });
  it("Cenário 15: Inserir uma data maior que a data atual (Sistema permite)", () => {
    cy.get('input[data-testid="dob"]').type("2030-12-31");
    cy.waitDemo();
    cy.get('input[data-testid="dob"]').should("have.value", "2030-12-31");
    cy.waitDemo();
  });
  it("Cenário 16: Inserir números no campo Nome (O sistema permite)", () => {
    cy.get('input[data-testid="name"]').type("123456");
    cy.waitDemo();
    cy.get('input[data-testid="name"]').should("have.value", "123456");
    cy.waitDemo();
  });
});
