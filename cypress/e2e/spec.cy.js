describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://www.testingmarathon.com/register");
  });

  it("Should be able to login", () => {
    cy.contains(/Log in to WebIssues/i);
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.contains(/Administration Panel/i);
    cy.get('a[href="https://www.testingmarathon.com/register/index.php"]')
      .contains(/Log out/i)
      .click();
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
  it("Should be able to create issue and delete issue", () => {
    // Login
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    // Create issue
    cy.visit(
      "https://www.testingmarathon.com/register/client/index.php?folder=1"
    );
    cy.get('[title="Add Issue"]').click();
    cy.get("#field-issues-issueName").type("Testinis issue");
    cy.get("#field-issues-okSubmit").click();

    cy.get("#infobar-left")
      .contains(/Testinis issue/i)
      .should("be.visible");
    // Delete issue
    cy.get('[title="Delete Issue"]').click();
    cy.get("#field-issues-okSubmit").click();
    cy.contains(/Testinis issue/i).should("not.exist");
  });
  it.only("Should not be able to create issue", () => {
    // Login
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    // Create issue
    cy.visit(
      "https://www.testingmarathon.com/register/client/index.php?folder=1"
    );
    cy.get('[title="Add Issue"]').click();
    cy.get("#field-issues-issueName").type(" ");
    cy.get("#field-issues-okSubmit").click();

    cy.get(`[class="error"]`)
      .contains(/Incorrect value: Required value is missing./i)
      .should("be.visible");
    // Delete issue
  });
});
