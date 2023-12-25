describe("Testing headers", function () {
  it("Validate the header and the content type", function () {
    cy.request("employees")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });
});
