Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args)
  })
  Cypress.Commands.add('login', (username, password) => {
    const apiUrl = Cypress.env('apiUrl'); // Assurez-vous que l'URL de l'API est définie dans les variables d'environnement
  
    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      Cypress.env('authToken', loginResponse.body.token); // Stocker le jeton d'authentification dans une variable d'environnement
    });
  });
  Cypress.Commands.add('badlogin', (username, password) => {
    const apiUrl = Cypress.env('apiUrl'); // Assurez-vous que l'URL de l'API est définie dans les variables d'environnement
  
    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
      failOnStatusCode: false,
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(401);
      Cypress.env('authToken', loginResponse.body.token); // Stocker le jeton d'authentification dans une variable d'environnement
    });
  });
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })