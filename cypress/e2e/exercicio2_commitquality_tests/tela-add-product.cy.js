describe("Funcionalidade: Validar funcionalidades da tela de adicionar produto", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
  });
  it("Cenário 1: Validar acesso a página", () => {
    cy.navegarPara("addproduct");
    cy.location("pathname").should("eq", "/add-product");
    cy.url().should("include", "commitquality.com");
    cy.get("h1").contains("Add Product").should("be.visible");
  });
  it("Cenário 2: Validar se a URL está correta", () => {
    cy.navegarPara("addproduct");
    cy.url().should("include", "/add-product");
    cy.url().should("include", "commitquality.com");
  });
  it("Cenário 3: Validar refresh de tela com o método (Botão refresh)", () => {
    cy.navegarPara("addproduct");
    cy.reload();
    cy.url().should("include", "/add-product");
    cy.get("h1").contains("Add Product").should("be.visible");
  });
  it("Cenário 4: Validar refresh de tela com o método (F5)", () => {
    cy.navegarPara("addproduct");
    cy.reload();
    cy.url().should("include", "/add-product");
    cy.get("h1").contains("Add Product").should("be.visible");
  });
  it("Cenário 5: Validar refresh de tela com o método (Ctrl+R)", () => {
    cy.navegarPara("addproduct");
    cy.get("body").type("{ctrl}r");
    cy.wait(1000);
    cy.url().should("include", "/add-product");
    cy.get("body").should("be.visible");
  });
  it("Cenário 6: Validar a responsividade da tela", () => {
    cy.navegarPara("addproduct");
    cy.testarResponsividade("body");
  });
  it("Cenário 7: Validar o layout da tela de adicionar produto", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="product-textbox"]').should("exist");
    cy.get('[data-testid="price-textbox"]').should("exist");
    cy.get('[data-testid="date-stocked"]').should("exist");
    cy.get('[data-testid="submit-form"]').should("exist");
    cy.get('[data-testid="cancel-button"]').should("exist");
  });
  it("Cenário 8: Adicionar produto com sucesso", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="product-textbox"]').then(($campo) => {
      cy.preencherProdutoFaker($campo);
    });
    cy.waitDemo();
    cy.get('[data-testid="price-textbox"]').then(($campo) => {
      cy.preencherPrecoFaker($campo);
    });
    cy.waitDemo();
    cy.get('[data-testid="date-stocked"]').type("2025-10-26");
    cy.waitDemo();
    cy.get('[data-testid="submit-form"]').click();
    cy.waitDemo();
  });
  it("Cenário 9: Validar campos obrigatórios", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="submit-form"]').click();
    cy.url().should("include", "/add-product");
  });
  it("Cenário 10: Preencher somente o campo Name", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="product-textbox"]').then(($campo) => {
      cy.preencherProdutoFaker($campo);
    });
    cy.waitDemo();
    cy.get('[data-testid="price-textbox"]').clear();
    cy.get('[data-testid="date-stocked"]').clear();
    cy.get('[data-testid="submit-form"]').click();
    cy.waitDemo();
  });
  it("Cenário 11: Preencher somente o campo Price", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="product-textbox"]').clear();
    cy.waitDemo();
    cy.get('[data-testid="price-textbox"]').then(($campo) => {
      cy.preencherPrecoFaker($campo);
    });
    cy.waitDemo();
    cy.get('[data-testid="date-stocked"]').clear();
    cy.get('[data-testid="submit-form"]').click();
    cy.waitDemo();
  });
  it("Cenário 12: Preencher somente o campo Date Stocked", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="product-textbox"]').clear();
    cy.get('[data-testid="price-textbox"]').clear();
    cy.waitDemo();
    cy.get('[data-testid="date-stocked"]').type("2025-10-26");
    cy.waitDemo();
    cy.get('[data-testid="submit-form"]').click();
    cy.waitDemo();
  });
  it("Cenário 13: Validar botão Cancel", () => {
    cy.navegarPara("addproduct");
    cy.get('[data-testid="cancel-button"]').click();
    cy.url().should("eq", "https://commitquality.com/");
  });
});
