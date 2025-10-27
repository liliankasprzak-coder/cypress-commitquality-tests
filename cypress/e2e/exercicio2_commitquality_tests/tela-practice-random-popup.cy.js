// Cenários: Tela Practice Random Popup
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar Random Popup", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
  });

  it("Cenário 1: Clicar em Products", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();
    cy.url().should("not.include", "/practice-random");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", "Add Product").click();
    cy.waitDemo();
    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Practice", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", "Practice").click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });

  it("Cenário 4: Clicar em Learn", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();
    cy.log("Link Learn clicado");
  });

  it("Cenário 5: Clicar em Login", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", "Login").click();
    cy.waitDemo();
    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();
    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-random");
    cy.log("Voltou para a página Practice");
  });

  it("Cenário 7: Validar o Random Popup", () => {
    const fecharPopupSeExistir = () => {
      cy.get("body").then(($body) => {
        if (
          $body.text().includes("Random Popup") &&
          $body.find('button:contains("Close")').length > 0
        ) {
          cy.get("button").contains("Close").click({ force: true });
          cy.log("Popup fechado");
          cy.wait(500);
        }
      });
    };

    cy.get('div[data-testid="practice-random-overlay"]').should("be.visible");
    cy.get('div[data-testid="practice-random-overlay"]').click();
    cy.waitDemo();
    cy.url().should("include", "/practice-random");

    cy.wait(2000); // Aguardar 2 segundos para o popup aparecer

    cy.get("body").then(($body) => {
      const popupVisivel = $body.find(':contains("Random Popup")').length > 0;

      if (popupVisivel) {
        cy.log("Popup apareceu!");
        cy.get("button")
          .contains("Close")
          .should("be.visible")
          .click({ force: true });
        cy.log("Clicou no botão Close");
        cy.waitDemo();
        cy.contains("Random Popup").should("not.exist");
        cy.log("Popup fechado com sucesso");
      } else {
        cy.log("Popup não apareceu desta vez (comportamento aleatório)");
      }
    });

    cy.wait(1000);
    fecharPopupSeExistir();
    cy.wait(1000);
    fecharPopupSeExistir();
    cy.wait(1000);
    fecharPopupSeExistir();

    cy.log("Teste finalizado - todos os popups foram fechados");
  });
});
