// Cenários: Inspecionar Data Layer
// Autora: Lilian Kasprzak
// Analista de QA

describe("Inspecionar Data Layer", () => {
  before(() => {
    Cypress.on("uncaught:exception", () => {
      return false;
    });
  });

  it("Deve logar a estrutura completa da datalayer", () => {
    cy.visit("/practice");
    cy.get('[data-testid="practice-mock-data-layer"]')
      .should("be.visible")
      .click();
    cy.url().should("include", "/practice-mock-data-layer");

    cy.window().then((win) => {
      // Capturar datalayer
      const dataLayer = win.dataLayer;

      // Usar cy.log para mostrar no Cypress
      cy.log("Data Layer encontrada!");
      cy.log("Tipo:", Array.isArray(dataLayer) ? "Array" : typeof dataLayer);
      cy.log("Tamanho:", dataLayer ? dataLayer.length : 0);

      // Mostrar estrutura completa
      if (dataLayer && dataLayer.length > 0) {
        cy.log("Primeiro item:", JSON.stringify(dataLayer[0]));

        // Salvar em arquivo para análise
        cy.writeFile("cypress/fixtures/data-layer-structure.json", {
          dataLayer: dataLayer,
          type: Array.isArray(dataLayer) ? "Array" : typeof dataLayer,
          length: dataLayer.length,
          timestamp: new Date().toISOString(),
        });
      }

      // Verificar outras possíveis variáveis
      const allDataVars = Object.keys(win).filter(
        (key) =>
          key.toLowerCase().includes("data") ||
          key.toLowerCase().includes("layer"),
      );
      cy.log("Variáveis encontradas:", allDataVars.join(","));
    });
  });
});
