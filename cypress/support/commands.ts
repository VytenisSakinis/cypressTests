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

import { Response } from 'cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      goTo(path: string): void;
      login(username: string, password: string): void;
    }
  }
}

Cypress.Commands.add("goTo", (path: string) => {
  cy.visit(`${Cypress.env("url")}${path}`);
});

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.get('input[id="field-login-login"]').type(username);
  cy.get('input[id="field-login-password"]').type(password);
  cy.get('input[id="field-login-loginSubmit"]').click();
});