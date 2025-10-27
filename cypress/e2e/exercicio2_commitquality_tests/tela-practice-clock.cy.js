// Cenários: Tela Practice Clock
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar Practice Clock", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-clock"]').should("be.visible").click();
    cy.waitDemo();
    cy.url().should("include", "/practice-clock");
  });

  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice-clock");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Practice", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", "Practice").click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.log("Redirecionado para Practice");
  });

  it("Cenário 4: Clicar em Learn", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 5: Clicar em Login", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 6: Clicar em Back to Practice", () => {
    cy.url().should("include", "/practice-clock");
    cy.contains("a", /back to practice/i).click();
    cy.waitDemo();

    cy.url().should("include", "/practice");
    cy.url().should("not.include", "/practice-clock");
    cy.log("Voltou para a página Practice");
  });

  it("Cenário 7: Validar funcionalidade do Clock", () => {
    // Validar que o relógio atual está visível e com formato correto
    cy.get('[data-testid="clock"]')
      .should("be.visible")
      .invoke("text")
      .should("match", /^\d{2}:\d{2}:\d{2}$/); // Formato HH:MM:SS

    cy.log("Relógio atual está visível e no formato correto");

    // Aguardar 2 segundos e verificar se o relógio está atualizando
    cy.get('[data-testid="clock"]')
      .invoke("text")
      .then((initialTime) => {
        cy.wait(2000);
        cy.get('[data-testid="clock"]')
          .invoke("text")
          .should((newTime) => {
            expect(newTime).to.not.equal(initialTime);
          });
        cy.log("Relógio está atualizando corretamente");
      });
  });

  it("Cenário 8: Validar prêmio ao final da contagem regressiva", () => {
    // Validar que o timer está visível
    cy.get('[data-testid="timer"]').should("be.visible");
    cy.log("Temporizador iniciado");

    // Aguardar até o timer chegar a 0:00 (timeout de 5 minutos)
    cy.get('[data-testid="timer"]', { timeout: 300000 }).should(
      "contain",
      "0:00",
    );

    cy.log("Contagem regressiva chegou a zero");

    // Validar se a mensagem de prêmio aparece
    cy.get('[data-testid="message"]')
      .should("be.visible")
      .and("contain", "YOU WON... GO SUBSCRIBE TO COMMIT QUALITY");

    cy.log("Mensagem de prêmio exibida com sucesso");
  });

  it("Cenário 9: Validar textos da página", () => {
    cy.contains("h2", "Current time").should("be.visible");
    cy.contains("h2", "COUNTDOWN TIMER TO WIN A SPECIAL PRIZE").should(
      "be.visible",
    );
    cy.log("Todos os textos da página estão visíveis");
  });
});
