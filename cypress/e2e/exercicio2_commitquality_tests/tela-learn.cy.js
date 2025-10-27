// Cenários: Tela Learn
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar funcionalidades da tela Learn", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
  });

  it('Cenário 1: Validar direcionamento ao clicar em "Learn"', () => {
    cy.url().should("include", "commitquality.com");
    cy.getFlexivel("navbar-learn", "learn-link", "Learn").then(($link) => {
      const href = $link.attr("href");
      cy.log(`Link href: ${href}`);

      expect(href).to.include("youtube.com");

      cy.wrap($link).invoke("removeAttr", "target").click();
    });

    cy.url({ timeout: 10000 }).should("include", "youtube.com");
    cy.log("Redirecionado para YouTube na mesma aba");
  });
});
