/// <reference types="Cypress" />

describe("Putting everything together", function () {
  it("Should delete the created log/entry/registry", function () {
    cy.request({
      url: "employees/3",
      method: "DELETE",
    }).then((response) => {
      cy.wrap(response).its("status").should("equal", 200);
    });
  });

  it("Should validate that it doesn't exists in the db", function () {
    cy.task("queryDb", "SELECT * FROM employees WHERE id = 3").then(
      (results) => {
        cy.log(results);
        cy.wrap(results).should("have.length", 0);
      }
    );
  });
});
