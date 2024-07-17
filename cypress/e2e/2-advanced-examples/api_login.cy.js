describe("Test de l'API de connexion", () => {
  it("Devrait se connecter avec succès avec des identifiants valides", () => {
    cy.login('test2@test.fr', 'testtest');
  });

  it("Devrait échouer avec un code d'erreur 401 pour des identifiants invalides", () => {
    cy.badlogin('badusername', 'badpassword');
  });
});