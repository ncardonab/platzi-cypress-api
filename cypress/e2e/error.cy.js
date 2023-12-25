describe("Testing errors", function () {
  it("should validate the failed status code and the error message", function () {
    cy.request({
      url: "https://pokeapi.co/api/v2/4545",
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response.status).should("eq", 404);
      cy.wrap(response.body).should("eq", "Not Found");
    });
  });

  it("should validate the failed status code and message of Rick and Morty API", function () {
    cy.request({
      url: "https://rickandmortyapi.com/api/location/123474",
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).its("status").should("eq", 404);
      cy.wrap(response.body).should(
        "have.property",
        "error",
        "Location not found"
      );
    });
  });

  it("should validate that the our employees API retrieves an empty object", function () {
    cy.request({ url: "/79797", failOnStatusCode: false })
      .its("body")
      .should("be.empty");
  });
});
