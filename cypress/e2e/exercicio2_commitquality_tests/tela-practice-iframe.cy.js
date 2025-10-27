describe("Funcionalidade: Validar Iframe", () => {
  beforeEach(() => {
    cy.visit("https://commitquality.com/");
    cy.navegarPara("practice");
    cy.get('div[data-testid="practice-iframe"]').should("exist");
    cy.contains("Click here to practice Iframes").click();
    cy.waitDemo();
  });
  it("Cenário 1: Clicar em Adicionar produto (Link)", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('a[data-testid="navbar-addproduct"]')
        .should("be.visible")
        .click();
      cy.log("Clicou em Add Product dentro do iframe");
    });
    cy.waitDemo();
  });
  it("Cenário 2: Clicar em Practice", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("a", "Practice").should("be.visible").click();
      cy.log("Clicou em Practice dentro do iframe");
    });
    cy.waitDemo();
  });
  it("Cenário 3: Clicar em Learn", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("a", "Learn").should("be.visible").click();
      cy.log("Clicou em Learn dentro do iframe");
    });
    cy.waitDemo();
  });
  it("Cenário 4: Clicar em Login", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("a", "Login").should("be.visible").click();
      cy.log("Clicou em Login dentro do iframe");
    });
    cy.waitDemo();
  });
  it("Cenário 5: Validar o Scroll da página", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).scrollTo("bottom", { ensureScrollable: false });
      cy.log("Scroll até o final da página");
    });
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).scrollTo("top", { ensureScrollable: false });
      cy.log("Scroll até o topo da página");
    });
  });
  it("Cenário 6: Realizar um filtro", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("button", "Filter").should("be.visible").click();
      cy.log("Botão Filter clicado");
    });
    cy.waitDemo();
  });
  it("Cenário 7: Fazer um reset", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("button", "Reset").should("be.visible").click();
      cy.log("Botão Reset clicado");
    });
    cy.waitDemo();
  });
  it("Cenário 8: Apresentar mais produtos na página", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("button", "Show More").should("be.visible").click();
      cy.log("Botão Show More clicado");
    });
    cy.waitDemo();
  });
  it("Cenário 9: Adicionar um produto", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('a[data-testid="add-a-product-button"]')
        .should("be.visible")
        .click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .clear()
        .type("Product3");
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      const preco = Math.floor(Math.random() * 10000000000).toString();
      cy.wrap(body)
        .find('input[data-testid="price-textbox"]')
        .clear()
        .type(preco);
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .clear()
        .type("2025-01-15");
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('tr[data-testid*="product-row"]')
        .first()
        .within(() => {
          cy.get('td[data-testid="name"]').should("contain", "Product3");
        });
    });
    cy.log("Produto adicionado com sucesso");
  });
  it("Cenário 10: Adicionar produto - Dar Submit sem preencher nenhum campo", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Name must be at least 2 characters");
      cy.wrap(body).should("contain", "Price must not be empty and within 10 digits");
      cy.wrap(body).should("contain", "Date must not be empty");
      cy.wrap(body).should("contain", "Errors must be resolved before submitting");
    });
    cy.log("Validações exibidas corretamente");
  });
  it("Cenário 11: Adicionar produto - Preencher somente nome", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .type("Product4");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Price must not be empty and within 10 digits");
      cy.wrap(body).should("contain", "Date must not be empty");
    });
    cy.log("Validações de Price e Date exibidas");
  });
  it("Cenário 12: Adicionar produto - Preencher somente o preço", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("100");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Name must be at least 2 characters");
      cy.wrap(body).should("contain", "Date must not be empty");
    });
    cy.log("Validações de Name e Date exibidas");
  });
  it("Cenário 13: Adicionar produto - Preencher somente a data", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2025-01-01");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Name must be at least 2 characters");
      cy.wrap(body).should("contain", "Price must not be empty and within 10 digits");
    });
    cy.log("Validações de Name e Price exibidas");
  });
  it("Cenário 14: Adicionar produto - Adicionar um produto", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .type("Product5");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("250");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2025-01-15");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('tr[data-testid*="product-row"]')
        .first()
        .within(() => {
          cy.get('td[data-testid="name"]').should("contain", "Product5");
        });
    });
    cy.log("Produto adicionado com sucesso");
  });
  it("Cenário 15: Adicionar produto - Preencher todos os campos e cancelar", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .type("Product6");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("300");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2025-02-01");
      cy.wrap(body).contains("a", "cancel").click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find("table.product-list-table").should("be.visible");
    });
    cy.log("Cancelou e voltou para a lista");
  });
  it("Cenário 16: Adicionar produto - Não preencher e cancelar", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).contains("a", "cancel").click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find("table.product-list-table").should("be.visible");
    });
    cy.log("Cancelou sem preencher e voltou para a lista");
  });
  it("Cenário 17: Preencher campo Nome com números", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[data-testid="product-textbox"]').type("123456");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("100");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2025-01-15");
      cy.wrap(body).find('button[data-testid="submit-form"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('tr[data-testid*="product-row"]')
        .first()
        .within(() => {
          cy.get('td[data-testid="name"]').should("contain", "123456");
        });
    });
    cy.log("Sistema permitiu nome com números");
  });
  it("Cenário 18: Preencher campo Price com letras", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .type("Product7");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("abcdef");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2025-01-15");
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="price-textbox"]')
        .should("have.value", "");
    });
    cy.log("Sistema não permitiu letras no preço");
  });
  it("Cenário 19: Validar que data futura não é aceita no campo Date Stocked", () => {
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('a[data-testid="add-a-product-button"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body)
        .find('input[data-testid="product-textbox"]')
        .type("Product8");
      cy.wrap(body).find('input[data-testid="price-textbox"]').type("200");
      cy.wrap(body)
        .find('input[data-testid="date-stocked"]')
        .type("2029-05-15");
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[data-testid="product-textbox"]').click();
    });
    cy.waitDemo();
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Date must not be in the future");
    });
    cy.log('Mensagem de erro exibida: "Date must not be in the future"');
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).should("contain", "Errors must be resolved before submitting");
    });
    cy.log("Sistema bloqueou o envio do formulário com data futura");
  });
});
