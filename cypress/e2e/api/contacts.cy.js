import { faker } from "@faker-js/faker";

describe("API Contacts spec", () => {
  function createContact(firstname, lastname, email, gender) {
    const contact = {
      firstName: firstname,
      lastName: lastname,
      gender: gender,
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
    };

    return contact;
  }

  const userData = {
    email: faker.internet.exampleEmail(),
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName("female"),
    randomString: faker.string.uuid(),
  };
  let keepGeneratedEmail;
  let keepContactID;
  beforeEach(() => {});
  it("Should be able to create and get contact", () => {
    cy.createContact(
      createContact(userData.firstName, userData.lastName, userData.email, "f"),
      true
    ).then((response) => {
      expect(response.body.email).eql(userData.email);
      expect(response.body.firstName).eql(userData.firstName);
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eql(200);
      expect(response.body.contactID).lengthOf(24);
      keepContactID = response.body.contactID;
      keepGeneratedEmail = response.body.email;
    });
  });
  it("Should be able to get created contact", () => {
    cy.GETContact(keepContactID).then((response) => {
      expect(response.body.email).eql(userData.email.toLowerCase());
    });
  });
  it("Should be able to create contact", () => {
    cy.createContactByEmail(userData.email, true).then((response) => {
      expect(response.body.email).eql(userData.email);
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eql(200);
      expect(response.body.contactID).lengthOf(24);
    });
  });
  it("Should not able to create contact", () => {
    cy.createContact(
      createContact(
        userData.firstName,
        userData.lastName,
        userData.randomString,
        "m"
      ),
      false
    );
  });
  it("Should be able to get contact list", () => {
    cy.GETContacts(10, keepGeneratedEmail).then((response) => {
      expect(response.status).eql(200);
      cy.log(response.body);
    });
  });
  it("Should be able to update the contact", () => {
    cy.PATCHContact(
      createContact(
        userData.firstName,
        userData.lastName,
        keepGeneratedEmail.toLowerCase()
      ),
      keepContactID,
      false
    ).then((response) => {
      expect(response.status).eql(200);
    });
  });
});
