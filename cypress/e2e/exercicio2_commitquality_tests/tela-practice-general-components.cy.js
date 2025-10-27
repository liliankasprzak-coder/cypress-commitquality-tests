// Cenários: Tela Practice General Components
// Autora: Lilian Kasprzak
// Analista de QA

describe("Funcionalidade: Validar componentes gerais na prática", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
  });

  it("Cenário 1: Clicar em Products", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Products").should("be.visible").click();
    cy.waitDemo();

    cy.url().should("not.include", "/practice");
    cy.log("Link Products clicado");
  });

  it("Cenário 2: Clicar em Add Product", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Add Product").click();
    cy.waitDemo();

    cy.url().should("include", "/add-product");
    cy.log("Redirecionado para Add Product");
  });

  it("Cenário 3: Clicar em Learn", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Learn").should("be.visible").click();
    cy.waitDemo();

    cy.log("Link Learn clicado");
  });

  it("Cenário 4: Clicar em Login", () => {
    cy.url().should("include", "/practice");
    cy.contains("a", "Login").click();
    cy.waitDemo();

    cy.url().should("include", "/login");
    cy.log("Redirecionado para Login");
  });

  it("Cenário 5: Validar Buttons no componente geral", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li.extra-info", "Buttons").click();
    cy.waitDemo();
    cy.get('button.practice-button[data-testid="basic-click"]').click();
    cy.contains("Button clicked").should("be.visible");
    cy.waitDemo();
    cy.get('button.practice-button[data-testid="double-click"]').dblclick();
    cy.contains("Button double clicked").should("be.visible");
    cy.waitDemo();
    cy.get('button.practice-button[data-testid="right-click"]').rightclick();
    cy.contains("Button right mouse clicked").should("be.visible");
    cy.waitDemo();
  });
  it("Cenário 6: Validar Radio Buttons no componente geral", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Radio Buttons").click();
    cy.waitDemo();
    cy.get('input[type="radio"][data-testid="option1"]').click();
    cy.contains("option1 clicked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="radio"][data-testid="option2"]').click();
    cy.contains("option2 clicked").should("be.visible");
    cy.waitDemo();
  });
  it("Cenário 7: Validar Dropdowns no componente geral", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Dropdowns").click();
    cy.waitDemo();
    cy.get('div[data-testid="dropdown"]')
      .find("select")
      .select("option1")
      .should("have.value", "option1");
    cy.waitDemo();
    cy.get('div[data-testid="dropdown"]')
      .find("select")
      .select("option2")
      .should("have.value", "option2");
    cy.waitDemo();
    cy.get('div[data-testid="dropdown"]')
      .find("select")
      .select("option3")
      .should("have.value", "option3");
    cy.waitDemo();
  });
  it("Cenário 8: Validar Checkboxes no componente geral", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Checkboxes").click();
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox1"]')
      .check()
      .should("be.checked");
    cy.contains("Checkbox 1 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox1"]')
      .uncheck()
      .should("not.be.checked");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox2"]')
      .check()
      .should("be.checked");
    cy.contains("Checkbox 2 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox2"]')
      .uncheck()
      .should("not.be.checked");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox3"]')
      .check()
      .should("be.checked");
    cy.contains("Checkbox 3 checked").should("be.visible");
    cy.waitDemo();
    cy.get('input[type="checkbox"][data-testid="checkbox3"]')
      .uncheck()
      .should("not.be.checked");
    cy.waitDemo();
  });
  it("Cenário 9: Validar link My Youtube", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Links").click();
    cy.waitDemo();
    cy.get('a[data-testid="link-same-tab"]')
      .first()
      .should("be.visible")
      .then(($link) => {
        const href = $link.attr("href");
        cy.log(`Link 1: ${href}`);
        expect(href).to.include("youtube.com");
        cy.log("Link My Youtube validado");
      });
  });
  it("Cenário 10: Validar link Open my youtube in a new tab", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Links").click();
    cy.waitDemo();
    cy.get('a[data-testid="link-newtab"]')
      .first()
      .should("be.visible")
      .then(($link) => {
        const href = $link.attr("href");
        const target = $link.attr("target");
        cy.log(`Link 2: ${href} (target: ${target})`);
        expect(href).to.include("youtube.com");
        expect(target).to.equal("_blank");
        cy.log("Link Open my youtube validado");
      });
  });
  it("Cenário 11: Validar link Go to practice page", () => {
    cy.get('div[data-testid="practice-general"]').should("exist");
    cy.contains("li", "Links").click();
    cy.waitDemo();
    cy.get('a[data-testid="link-newtab-practice"]')
      .first()
      .should("be.visible")
      .invoke("removeAttr", "target")
      .click();
    cy.waitDemo();
    cy.url().should("match", /\/practice/);
    cy.log("Redirecionou para /practice");
  });
});
