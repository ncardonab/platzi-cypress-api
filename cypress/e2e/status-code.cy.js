describe("Testing requests status code", function () {
  it("should validate 200 Ok status code when getting employees", function () {
    cy.request("employees").its("status").should("eq", 200);
  });

  it("should validate 404 Not Found status code when getting employees", function () {
    cy.request({ url: "employees/4", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });

  it("should validate 201 Created status code when creating a new employee and 202 Accepted status code when deleting the just created employee", function () {
    cy.request("POST", "employees", {
      name: "Nick",
      lastname: "Cardona",
      email: "ncardonab@gmail.com",
    }).as("createdEmployee");

    cy.get("@createdEmployee").its("status").should("eq", 201);

    cy.get("@createdEmployee")
      .its("body")
      .its("id")
      .then((createdEmployeeId) => {
        cy.request("DELETE", `employees/${createdEmployeeId}`)
          .its("status")
          .should("eq", 200);
      });
  });
});
