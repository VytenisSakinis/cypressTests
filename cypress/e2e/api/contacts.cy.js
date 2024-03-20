import { faker } from "@faker-js/faker";

describe("API Contacts spec", () => {
  const userData = {
    email: faker.internet.exampleEmail(),
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName("female"),
    randomString: faker.string.uuid(),
  };
  beforeEach(() => {});
  it("Should be able to create and get contact", () => {
    const contact = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: "f",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: userData.email,
        },
      ],
    };
      cy.createContact(contact, true).then((response) => {
      expect(response.body.email).eql(userData.email);
      expect(response.body.firstName).eql(userData.firstName);
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eql(200);
      expect(response.body.contactID).lengthOf(24);
      return response.body.contactID;
    }).then((contactID) => {
      cy.GETContact(contactID).then((response) => {
        expect(response.body.email).eql(userData.email.toLowerCase());
      })
    });
  });
  it("Should be able to create contact", () => {
    cy.createContactByEmail("random@email.com", true).then((response) => {
      expect(response.body.email).eql("random@email.com");
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eql(200);
      expect(response.body.contactID).lengthOf(24);
    });
    // expect(response).equal(400);
  });
  it("Should not able to create contact", () => {
    const contact = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: "f",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: userData.randomString,
        },
      ],
    };
    cy.createContact(contact, false);
    // expect(response).equal(400);
  });
  it("Should be able to get contact list", () => {
    cy.GETContacts(10).then((response) => {
      expect(response.status).eql(200)
      cy.log(response.body)
    })
  });

});
