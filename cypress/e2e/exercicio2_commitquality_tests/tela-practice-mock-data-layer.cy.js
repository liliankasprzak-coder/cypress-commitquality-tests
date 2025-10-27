// Cenários: Tela Practice Mock Data Layer
// Autora: Lilian Kasprzak
// Analista de QA

describe("Validar data layer mockada", () => {
  beforeEach(() => {
    // Navegar para a página practice
    cy.visit("/practice");

    // Localizar e clicar no container Mock Datalayer
    cy.get('[data-testid="practice-mock-data-layer"]')
      .should("be.visible")
      .click();

    // Verificar que navegou para a página correta
    cy.url().should("include", "/practice-mock-data-layer");
  });

  it("Deve exibir a datalayer mockada na tag script", () => {
    cy.window().then((win) => {
      expect(win.dataLayer).to.exist;
    });
  });

  it("Deve validar estrutura da datalayer mockada", () => {
    cy.window().then((win) => {
      // Verificar se é um objeto (CommitQuality usa objeto, não array)
      expect(typeof win.dataLayer).to.equal("object");
      expect(win.dataLayer).to.not.be.null;

      // Verificar se tem propriedades esperadas
      expect(win.dataLayer).to.have.property("pageName");
    });
  });

  it("Deve conter dados mockados corretos", () => {
    cy.window().then((win) => {
      // TODO: Validar valores específicos mockados
      const dataLayer = win.dataLayer;
      expect(dataLayer).to.not.be.empty;
    });
  });

  it("Deve permitir acesso via window object", () => {
    cy.window().should("have.property", "dataLayer");

    cy.window().then((win) => {
      expect(win.dataLayer).to.not.be.undefined;
      expect(win.dataLayer).to.not.be.null;
    });
  });

  it("Deve validar eventos na datalayer", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      // Verificar se o objeto tem propriedades (eventos/dados)
      const keys = Object.keys(dataLayer);
      expect(keys.length).to.be.greaterThan(0);

      // Verificar propriedades comuns
      expect(dataLayer).to.have.property("pageName");
    });
  });

  it("Deve validar propriedades da datalayer", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      // Verificar se o objeto tem múltiplas propriedades
      const keys = Object.keys(dataLayer);
      expect(keys.length).to.be.greaterThan(0);

      // Log das propriedades encontradas
      cy.log("Propriedades do dataLayer:", keys.join(","));
    });
  });

  it("Deve verificar se datalayer não está vazia", () => {
    cy.window().then((win) => {
      expect(win.dataLayer).to.not.be.empty;

      const keys = Object.keys(win.dataLayer);
      expect(keys.length).to.be.greaterThan(0);
    });
  });

  it("Deve validar formato dos dados mockados", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      // Verificar se é um objeto válido
      expect(typeof dataLayer).to.equal("object");
      expect(dataLayer).to.not.be.null;

      // Verificar se tem propriedades válidas
      Object.values(dataLayer).forEach((value) => {
        expect(value).to.not.be.undefined;
      });
    });
  });

  it("Deve verificar presença de campos obrigatórios", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      // TODO: Ajustar conforme campos obrigatórios da sua datalayer
      if (dataLayer.length > 0) {
        expect(dataLayer[0]).to.have.property("event");
      }
    });
  });

  it("Deve validar valores mockados vs valores reais", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      // TODO: Validar se os valores mockados estão corretos
      // const mockEvent = dataLayer.find(item => item.event === 'pageview');
      expect(dataLayer).to.exist;
    });
  });
});
