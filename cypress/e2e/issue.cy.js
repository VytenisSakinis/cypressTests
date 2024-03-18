describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://www.testingmarathon.com/register");
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.visit(
      "https://www.testingmarathon.com/register/client/index.php?folder=1"
    );
  });
  it("Should be able to create issue and delete issue", () => {
      // Create issue
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
  it("Should not be able to create issue", () => {
    // Create issue
    cy.get('[title="Add Issue"]').click();
    cy.get("#field-issues-issueName").type(" ");
    cy.get("#field-issues-okSubmit").click();

    cy.get(`[class="error"]`)
      .contains(/Incorrect value: Required value is missing./i)
      .should("be.visible");
  });
});