import { Response } from 'cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create contact by email.
       * @example cy.createContactByEmail('greeting@example.com')
       */
      createContactByEmail(email: string, failonstatuscode?: boolean): Chainable<Response<any>>;
      
      /**
       * Custom command to create contact.
       * @example cy.createContact({firstName: 'John', lastName: 'Doe', ...})
       */
      createContact(contact: any, failOnStatusCode?: boolean): Chainable<Response<any>>;
      
      /**
       * Custom command to GET contact by contact email.
       * @example cy.GETContact('greeting@example.com')
       */
      GETContact(email: string, failOnStatusCode?: boolean): Chainable<Response<any>>;
      
      /**
       * Custom command to GET contacts by limit and optionally by email.
       * @example cy.GETContacts(10, 'greeting@example.com')
       */
      GETContacts(limit: number, email?: string, failOnStatusCode?: boolean): Chainable<Response<any>>;
      
      /**
       * Custom command to PATCH contact by contact id and email.
       * @example cy.PATCHContact('contactId', 'greeting@example.com', {...})
       */
      PATCHContact(contactID: string, email: string, failOnStatusCode?: boolean): Chainable<Response<any>>;
    }
  }
}

Cypress.Commands.add("createContact", (contact: any, failonstatuscode?: boolean) => {
  if (failonstatuscode === undefined) failonstatuscode = true;
  const response = cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/v3/contacts`,
    body: contact,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});

Cypress.Commands.add("createContactByEmail", (email: string, failonstatuscode?: boolean) => {
  if (failonstatuscode === undefined) failonstatuscode = true;
  const response = cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/v3/contacts`,
    body: {
      firstName: "Zigvida",
      lastName: "Zigvidaite",
      gender: "f",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: email,
        },
      ],
    },
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});

Cypress.Commands.add("GETContact", (email: string, failonstatuscode?: boolean) => {
  if (failonstatuscode === undefined) failonstatuscode = true;
  const response = cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/v3/contacts/${email}`,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});

Cypress.Commands.add("GETContacts", (limit: number, email?: string, failonstatuscode = true) => {
  let searchParams = `limit=${limit}`;
  if (email) {
    searchParams += `&email=${email}`;
  }
  const response = cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/v3/contacts?${searchParams}`,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});

Cypress.Commands.add("PATCHContact", (contact: any, contactID: string, failonstatuscode?: boolean) => {
  if (failonstatuscode === undefined) failonstatuscode = true;

  const response = cy.request({
    method: "PATCH",
    url: `${Cypress.env("apiUrl")}/v3/contacts/${contactID}`,
    body: contact,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});