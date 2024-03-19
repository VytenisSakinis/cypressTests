import { faker } from '@faker-js/faker';

describe("template spec", () => {
  let createIssueTitle;

  beforeEach(() => {
    createIssueTitle = faker.string.uuid(); // Generate unique title for each test
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

  before(() => {
    createIssueTitle = faker.string.uuid();
    cy.visit("https://www.testingmarathon.com/register");
    cy.get('input[id="field-login-login"]').type("vytenis.sakinis@gmail.com");
    cy.get('input[id="field-login-password"]').type(
      "vytenis.sakinis@gmail.com"
    );
    cy.get('input[id="field-login-loginSubmit"]').click();
    cy.visit(
      "https://www.testingmarathon.com/register/client/index.php?folder=1"
    );
    cy.get('[title="Add Issue"]').click();
    cy.get("#field-issues-issueName").type(createIssueTitle);
    cy.get("#field-issues-okSubmit").click();
    cy.get("#infobar-left").contains(createIssueTitle).should("be.visible");
  });

  it("Should be able to create issue and delete issue", () => {
    cy.get('[title="Add Issue"]').click();
    cy.get("#field-issues-issueName").type(createIssueTitle);
    cy.get("#field-issues-okSubmit").click();

    cy.get("#infobar-left").contains(createIssueTitle).should("be.visible");
  });

  after(() => {
    // delete created issue
    cy.get(`#field-search-searchBox`).type(createIssueTitle);
    cy.get("#field-search-searchSubmit").click();
    cy.get(`[title="${createIssueTitle}"]`).click();
    cy.get('[title="Delete Issue"]').click();
    cy.get("#field-issues-okSubmit").click();
    cy.contains(`${createIssueTitle}`).should("not.exist");
  });
});
