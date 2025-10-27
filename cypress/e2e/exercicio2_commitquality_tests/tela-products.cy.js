// Cenários: Tela Products
// Autora: Lilian Kasprzak
// Analista de QA

describe('Funcionalidade: Validar tela de Products', () => {
  beforeEach(() => {
    cy.visit('https://commitquality.com/');
  });

  it('Cenário 1: Acessar a URL', () => {
    cy.url().should('eq', 'https://commitquality.com/');
    cy.get('body').should('be.visible');
    cy.log('URL acessada com sucesso');
  });

  it('Cenário 2: Validar refresh de tela', () => {
    cy.reload();
    cy.url().should('eq', 'https://commitquality.com/');
    cy.get('body').should('be.visible');
    cy.log('Refresh de tela validado');
  });

  it('Cenário 3: Validar responsividade da tela', () => {
    cy.testarResponsividade('body');
    cy.log('Responsividade validada');
  });

  it('Cenário 4: Validar layout da tela Products', () => {
    // Validar navbar
    cy.get('nav.navbar').should('be.visible');
    cy.get('[data-testid="navbar-products"]').should('be.visible');
    
    // Validar tabela de produtos
    cy.get('table.product-list-table').should('be.visible');
    cy.get('table thead').should('contain', 'ID');
    cy.get('table thead').should('contain', 'Name');
    cy.get('table thead').should('contain', 'Price');
    cy.get('table thead').should('contain', 'Date Stocked');
    
    // Validar filtros
    cy.get('.filter-container').should('be.visible');
    cy.get('[data-testid="filter-button"]').should('be.visible');
    cy.get('[data-testid="reset-filter-button"]').should('be.visible');
    
    // Validar botões de ação
    cy.get('[data-testid="show-more-button"]').should('be.visible');
    cy.get('[data-testid="add-a-product-button"]').should('be.visible');
    
    cy.log('Layout da tela validado');
  });

  it('Cenário 5: Clicar em Add Product', () => {
    cy.contains('a', 'Add Product').should('be.visible').click();
    cy.waitDemo();
    cy.url().should('include', '/add-product');
    cy.log('Redirecionado para Add Product');
  });

  it('Cenário 6: Clicar em Practice', () => {
    cy.contains('a', 'Practice').should('be.visible').click();
    cy.waitDemo();
    cy.url().should('include', '/practice');
    cy.log('Redirecionado para Practice');
  });

  it('Cenário 7: Clicar em Learn', () => {
    cy.contains('a', 'Learn').should('be.visible').click();
    cy.waitDemo();
    cy.log('Link Learn clicado');
  });

  it('Cenário 8: Clicar em Login', () => {
    cy.contains('a', 'Login').should('be.visible').click();
    cy.waitDemo();
    cy.url().should('include', '/login');
    cy.log('Redirecionado para Login');
  });

  it('Cenário 9: Realizar um filtro', () => {
    cy.contains('button', 'Filter').should('be.visible').click();
    cy.waitDemo();
    cy.log('Botão Filter clicado');
  });

  it('Cenário 10: Fazer um reset', () => {
    cy.contains('button', 'Reset').should('be.visible').click();
    cy.waitDemo();
    cy.log('Botão Reset clicado');
  });

  it('Cenário 11: Apresentar mais produtos na página', () => {
    cy.contains('button', 'Show More').should('be.visible').click();
    cy.waitDemo();
    cy.log('Botão Show More clicado');
  });

  it('Cenário 12: Adicionar um produto', () => {
    cy.get('a[data-testid="add-a-product-button"]')
      .should('be.visible')
      .click();
    cy.waitDemo();
    
    cy.get('input[data-testid="product-textbox"]')
      .clear()
      .type('Product Test');
    cy.waitDemo();
    
    const preco = Math.floor(Math.random() * 10000).toString();
    cy.get('input[data-testid="price-textbox"]')
      .clear()
      .type(preco);
    cy.waitDemo();
    
    cy.get('input[data-testid="date-stocked"]')
      .clear()
      .type('2025-01-15');
    cy.waitDemo();
    
    cy.get('button[data-testid="submit-form"]').click();
    cy.waitDemo();
    
    cy.get('tr[data-testid*="product-row"]')
      .first()
      .within(() => {
        cy.get('td[data-testid="name"]').should('contain', 'Product Test');
      });
    
    cy.log('Produto adicionado com sucesso');
  });

  it('Cenário 13: Adicionar produto - Dar Submit sem preencher nenhum campo', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.get('button[data-testid="submit-form"]').click();
    cy.waitDemo();
    
    cy.contains('Name must be at least 2 characters').should('be.visible');
    cy.contains('Price must not be empty and within 10 digits').should('be.visible');
    cy.contains('Date must not be empty').should('be.visible');
    cy.contains('Errors must be resolved before submitting').should('be.visible');
    
    cy.log('Validações exibidas corretamente');
  });

  it('Cenário 14: Adicionar produto - Preencher todos os campos e cancelar', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.get('input[data-testid="product-textbox"]')
      .type('Product Cancel Test');
    cy.get('input[data-testid="price-textbox"]')
      .type('300');
    cy.get('input[data-testid="date-stocked"]')
      .type('2025-02-01');
    cy.waitDemo();
    
    cy.contains('a', 'cancel').click();
    cy.waitDemo();
    
    cy.get('table.product-list-table').should('be.visible');
    cy.log('Cancelou e voltou para a lista');
  });

  it('Cenário 15: Adicionar produto - Não preencher e cancelar', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.contains('a', 'cancel').click();
    cy.waitDemo();
    
    cy.get('table.product-list-table').should('be.visible');
    cy.log('Cancelou sem preencher e voltou para a lista');
  });

  it('Cenário 16: Preencher campo Nome com números', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.get('input[data-testid="product-textbox"]').type('123456');
    cy.get('input[data-testid="price-textbox"]').type('100');
    cy.get('input[data-testid="date-stocked"]').type('2025-01-15');
    cy.waitDemo();
    
    cy.get('button[data-testid="submit-form"]').click();
    cy.waitDemo();
    
    cy.get('tr[data-testid*="product-row"]')
      .first()
      .within(() => {
        cy.get('td[data-testid="name"]').should('contain', '123456');
      });
    
    cy.log('Sistema permitiu nome com números');
  });

  it('Cenário 17: Preencher campo Price com letras', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.get('input[data-testid="product-textbox"]').type('Product Price Test');
    cy.get('input[data-testid="price-textbox"]').type('abcdef');
    cy.get('input[data-testid="date-stocked"]').type('2025-01-15');
    cy.waitDemo();
    
    cy.get('input[data-testid="price-textbox"]').should('have.value', '');
    cy.log('Sistema não permitiu letras no preço');
  });

  it('Cenário 18: Inserir uma data maior que a data atual', () => {
    cy.get('a[data-testid="add-a-product-button"]').click();
    cy.waitDemo();
    
    cy.get('input[data-testid="product-textbox"]').type('Product Future Date');
    cy.get('input[data-testid="price-textbox"]').type('200');
    cy.get('input[data-testid="date-stocked"]').type('2029-05-15');
    cy.waitDemo();
    
    // Clicar fora do campo para disparar validação
    cy.get('input[data-testid="product-textbox"]').click();
    cy.waitDemo();
    
    cy.contains('Date must not be in the future').should('be.visible');
    cy.contains('Errors must be resolved before submitting').should('be.visible');
    cy.log('Mensagem de erro exibida: "Date must not be in the future"');
    cy.log('Sistema bloqueou o envio do formulário com data futura');
  });
});
