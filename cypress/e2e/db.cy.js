describe("Database testing", function () {
  after(function () {
    cy.task(
      "queryTestDb",
      `DELETE FROM person WHERE id = ${this.lastInsertedId}`
    )
      .its("serverStatus")
      .should("eq", 2);
  });

  it("Select", function () {
    cy.task("queryTestDb", "SELECT * FROM person")
      .its(0)
      .its("First_name")
      .should("eq", "Joe");
  });

  it("should create a new person and delete it", function () {
    const person = {
      lastName: "Doe",
      firstName: "Joe",
      address: "s-Gravelandseveer 3-4, 1011 KM Amsterdam, Netherlands",
      city: "Amsterdam",
    };
    cy.task(
      "queryTestDb",
      `INSERT INTO person (last_name, first_name, address, city) VALUES ('${person.lastName}', '${person.firstName}', '${person.address}', '${person.city}')`
    ).then((results) => {
      cy.wrap(results.affectedRows).should("eq", 1);
      cy.wrap(results.insertId).as("lastInsertedId");
    });
  });

  it("Retrieving the just created person", function () {
    cy.task(
      "queryTestDb",
      `SELECT * FROM person WHERE id = ${this.lastInsertedId}`
    ).then((results) => {
      cy.wrap(results[0].First_name).should("eq", "Joe");
      cy.wrap(results[0].last_name).should("eq", "Doe");
    });
  });
});
