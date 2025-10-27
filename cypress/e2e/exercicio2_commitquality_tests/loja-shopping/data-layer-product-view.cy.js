// Cenários: Data Layer - Visualização de Produto
// Autora: Lilian Kasprzak
// Analista de QA

describe('Data Layer: Visualização de Produto', () => {
  beforeEach(() => {
    // Mock do data layer antes de cada teste
    cy.visit('https://commitquality.com/', {
      onBeforeLoad(win) {
        win.dataLayer = [];
      }
    });
  });

  it('Deve enviar evento de visualização de produto', () => {
    // Simular push do evento ao data layer
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'BRL',
          value: 299.90,
          items: [{
            item_id: 'PROD-001',
            item_name: 'Notebook Dell',
            item_category: 'Eletrônicos',
            item_category2: 'Computadores',
            item_brand: 'Dell',
            price: 299.90,
            quantity: 1
          }]
        }
      });

      // Validar estrutura do evento
      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.event).to.equal('view_item');
      expect(lastEvent.ecommerce.items[0].item_id).to.equal('PROD-001');
      expect(lastEvent.ecommerce.items[0].item_name).to.equal('Notebook Dell');
      expect(lastEvent.ecommerce.value).to.equal(299.90);
    });
  });

  it('Deve validar campos obrigatórios do evento view_item', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'BRL',
          value: 150.00,
          items: [{
            item_id: 'PROD-002',
            item_name: 'Mouse Gamer',
            price: 150.00
          }]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      
      // Validar campos obrigatórios
      expect(lastEvent).to.have.property('event');
      expect(lastEvent).to.have.property('ecommerce');
      expect(lastEvent.ecommerce).to.have.property('currency');
      expect(lastEvent.ecommerce).to.have.property('value');
      expect(lastEvent.ecommerce).to.have.property('items');
      expect(lastEvent.ecommerce.items[0]).to.have.property('item_id');
      expect(lastEvent.ecommerce.items[0]).to.have.property('item_name');
    });
  });

  it('Deve enviar múltiplos produtos visualizados', () => {
    cy.window().then((win) => {
      win.dataLayer.push({
        event: 'view_item_list',
        ecommerce: {
          items: [
            {
              item_id: 'PROD-003',
              item_name: 'Teclado Mecânico',
              price: 350.00
            },
            {
              item_id: 'PROD-004',
              item_name: 'Headset Gamer',
              price: 280.00
            },
            {
              item_id: 'PROD-005',
              item_name: 'Webcam HD',
              price: 180.00
            }
          ]
        }
      });

      const lastEvent = win.dataLayer[win.dataLayer.length - 1];
      expect(lastEvent.event).to.equal('view_item_list');
      expect(lastEvent.ecommerce.items).to.have.length(3);
    });
  });
});
