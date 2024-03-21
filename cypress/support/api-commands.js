import faker from "@faker-js/faker";


Cypress.Commands.add("createContact", (contact, failonstatuscode) => {
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

Cypress.Commands.add("createContactByEmail", (email, failonstatuscode) => {
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

Cypress.Commands.add("GETContact", (contactID, failonstatuscode) => {
  if (failonstatuscode === undefined) failonstatuscode = true;
  const response = cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/v3/contacts/${contactID}`,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});

Cypress.Commands.add("GETContacts", (limit, email, failonstatuscode = true) => {
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

Cypress.Commands.add("PATCHContact", (contact, contactID, failonstatuscode) => {
  if (failonstatuscode === undefined) failonstatuscode = true;


  const response = cy.request({
    method: "PATCH",
    url: `https://api.omnisend.com/v3/contacts/${contactID}`,
    body: contact,
    headers: {
      "X-API-KEY": Cypress.env("API_KEY"),
    },
    failOnStatusCode: failonstatuscode,
  });

  return response;
});
