describe("template spec", () => {
  beforeEach(() => {
    cy.goTo(`/register`);
  });

  it("Should be able to login", () => {
    cy.contains(/Log in to WebIssues/i);
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.contains(/Administration Panel/i);
  });
  it("Should not be able to login with invalid login", () => {
    cy.get('input[id="field-login-login"]').type(
      "vytenis.sakinis111@gmail.com"
    );
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.contains(/Incorrect value: Invalid login or password./i);
  });
  it("Should not be able to login with invalid PASSWORD", () => {
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis111111111111111111@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.contains(/Incorrect value: Invalid login or password./i);
  });
  it("Should not be able to login with empty fields", () => {
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.get('[class="error"]').contains(
      /Incorrect value: Required value is missing./i
    );
  });
});
