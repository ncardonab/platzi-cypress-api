describe("Testing body", function () {
  it("should retrieve the exact expected body", function () {
    cy.request("employees/1").its("body").should("deep.equal", {
      id: 1,
      first_name: "Javier",
      last_name: "Eschweiler",
      email: "javier@platzi.com",
    });
  });
});
