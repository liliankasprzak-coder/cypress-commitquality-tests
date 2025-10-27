// Cenários: Data Layer - Carrinho e Compra
// Autora: Lilian Kasprzak
// Analista de QA

describe('Data Layer: Carrinho e Compra', () => {
  beforeEach(() => {
    // Mock do data layer antes de cada teste
    cy.visit('https://commitquality.com/', {
      onBeforeLoad(win) {
        win.dataLayer = [];
      }
    });
  });

  it('Deve enviar evento de adicionar ao carrinho', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'BRL',
          value: 499.90,
          items: [{
            item_id: 'PROD-010',
            item_name: 'Smartphone Samsung',
            item_category: 'Eletrônicos',
            item_brand: 'Samsung',
            price: 499.90,
            quantity: 1
          }]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.event).to.equal('add_to_cart');
      expect(lastEvent.ecommerce.items[0].item_id).to.equal('PROD-010');
      expect(lastEvent.ecommerce.value).to.equal(499.90);
    });
  });

  it('Deve enviar evento de remover do carrinho', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          currency: 'BRL',
          value: 150.00,
          items: [{
            item_id: 'PROD-002',
            item_name: 'Mouse Gamer',
            price: 150.00,
            quantity: 1
          }]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.event).to.equal('remove_from_cart');
      expect(lastEvent.ecommerce.items[0].item_id).to.equal('PROD-002');
    });
  });

  it('Deve enviar evento de início do checkout', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'BRL',
          value: 1249.70,
          items: [
            {
              item_id: 'PROD-010',
              item_name: 'Smartphone Samsung',
              price: 499.90,
              quantity: 1
            },
            {
              item_id: 'PROD-001',
              item_name: 'Notebook Dell',
              price: 299.90,
              quantity: 1
            },
            {
              item_id: 'PROD-003',
              item_name: 'Teclado Mecânico',
              price: 350.00,
              quantity: 1
            }
          ]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.event).to.equal('begin_checkout');
      expect(lastEvent.ecommerce.items).to.have.length(3);
      expect(lastEvent.ecommerce.value).to.equal(1249.70);
    });
  });

  it('Deve enviar evento de compra finalizada', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: 'TXN-2025-001',
          affiliation: 'Loja Online',
          value: 1249.70,
          tax: 124.97,
          shipping: 50.00,
          currency: 'BRL',
          items: [
            {
              item_id: 'PROD-010',
              item_name: 'Smartphone Samsung',
              price: 499.90,
              quantity: 1
            },
            {
              item_id: 'PROD-001',
              item_name: 'Notebook Dell',
              price: 299.90,
              quantity: 1
            },
            {
              item_id: 'PROD-003',
              item_name: 'Teclado Mecânico',
              price: 350.00,
              quantity: 1
            }
          ]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      
      // Validar evento de compra
      expect(lastEvent.event).to.equal('purchase');
      expect(lastEvent.ecommerce.transaction_id).to.equal('TXN-2025-001');
      expect(lastEvent.ecommerce.value).to.equal(1249.70);
      expect(lastEvent.ecommerce.tax).to.equal(124.97);
      expect(lastEvent.ecommerce.shipping).to.equal(50.00);
      expect(lastEvent.ecommerce.items).to.have.length(3);
    });
  });

  it('Deve validar campos obrigatórios do evento purchase', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: 'TXN-2025-002',
          value: 299.90,
          currency: 'BRL',
          items: [{
            item_id: 'PROD-001',
            item_name: 'Notebook Dell',
            price: 299.90,
            quantity: 1
          }]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      
      // Validar campos obrigatórios
      expect(lastEvent).to.have.property('event');
      expect(lastEvent.ecommerce).to.have.property('transaction_id');
      expect(lastEvent.ecommerce).to.have.property('value');
      expect(lastEvent.ecommerce).to.have.property('currency');
      expect(lastEvent.ecommerce).to.have.property('items');
      expect(lastEvent.ecommerce.items[0]).to.have.property('item_id');
    });
  });

  it('Deve calcular valor total do carrinho corretamente', () => {
    cy.window().then((win) => {
      const items = [
        { price: 499.90, quantity: 2 },  // 999.80
        { price: 150.00, quantity: 3 },  // 450.00
        { price: 350.00, quantity: 1 }   // 350.00
      ];

      const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      win.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'BRL',
          value: totalValue,
          items: items.map((item, index) => ({
            item_id: `PROD-00${index + 1}`,
            item_name: `Produto ${index + 1}`,
            price: item.price,
            quantity: item.quantity
          }))
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.ecommerce.value).to.equal(1799.80);
    });
  });
});
