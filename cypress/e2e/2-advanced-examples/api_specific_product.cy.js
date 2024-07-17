describe("Retourner un produit spécifique après connexion", () => {
  const apiUrl = `${Cypress.env("apiUrl")}`;
  it("Retourner la fiche d'un produit spécifique après connexion", () => {
    // Utiliser la commande login et attendre qu'elle soit résolue
    cy.login('test2@test.fr', 'testtest').then(() => {

      //Récupérer un produit disponible
      cy.log("Détail d'un produit");
      cy.request({
        method: "GET",
        url: `http://localhost:8081/products/${5}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("authToken")}`,
        },
        failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
      }).then((productResponse) => {
        expect(productResponse.status).to.equal(200);
        expect(productResponse.body).to.have.property("id", 5);
        expect(productResponse.body)
          .to.have.property("name")
          .that.is.a("string");
        expect(productResponse.body)
          .to.have.property("description")
          .that.is.a("string");
        expect(productResponse.body)
          .to.have.property("price")
          .that.is.a("number");
        //Récupérer un produit non disponible

        cy.request({
          method: "GET",
          url: `http://localhost:8081/products/${2}`,
          headers: {
            Authorization: `Bearer ${Cypress.env("authToken")}`,
          },
          failOnStatusCode: false, // Ne pas échouer sur le code d'état de réponse
        }).then((productResponse) => {
          expect(productResponse.status).to.equal(404);
          cy.log("Produit inexistant");
        });
      });
    });
  });
})