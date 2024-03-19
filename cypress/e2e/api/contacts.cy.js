describe("API Contacts spec", () => {
  beforeEach(() => {});
  it("Should be able to create contact", () => {
    const response = cy.request({
      method: "POST",
      url: "https://api.omnisend.com/v3/contacts",
      body: {
        firstName: "{{Firstname}}",
        lastName: "{{lastName}}",
        gender: "m",
        identifiers: [
          {
            type: "email",
            channels: {
              email: {
                status: "subscribed",
              },
            },
            id: "sigis@gmail.com",
          },
        ],
      },
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "65ccf847e9bd2c273369931e-TDl7OdGUhFJxD2flU1zL34Ki0lMoiykIQIm2AgPTDb7IgT4VcC",
      },
      failOnStatusCode: false,
    });

    // expect(response).equal(400);
  });
});
