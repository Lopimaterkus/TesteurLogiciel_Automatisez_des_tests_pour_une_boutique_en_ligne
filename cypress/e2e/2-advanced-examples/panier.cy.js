describe("Test de récupération du panier après connexion", () => {

    const apiUrl = `${Cypress.env("apiUrl")}`;
    beforeEach(() => {
      cy.login('test2@test.fr', 'testtest');
    });

it("Ajouter un produit au panier", () => {
const productId = 4;
    cy.request({
      method: "GET",
      url: `http://localhost:8081/products/${productId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      failOnStatusCode: false,
    }).then((productResponse) => {
      expect(productResponse.status).to.eq(200);
      cy.request({
        method: "PUT",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${Cypress.env("authToken")}`,
        },
        body: {
          product: productId,
          quantity: 1,
        },
      }).then((addToCartResponse) => {
        expect(addToCartResponse.status).to.eq(200);
      });
    });
})

it("Commander plus de produits qu'il n'y en a disponible", () => {
    cy.visit("http://localhost:8080/#/login");
    cy.getBySel("login-input-username").type("test2@test.fr");
    cy.getBySel("login-input-password").type("testtest");
    cy.getBySel("login-submit").click();
    cy.getBySel("nav-link-cart").click();
    cy.getBySel("cart-line-quantity").type('{uparrow}');
    cy.getBySel("cart-input-address").type("1");
    cy.getBySel("cart-input-zipcode").type("10000");
    cy.getBySel("cart-input-city").type("A");
    cy.getBySel("cart-submit").click();
})
})