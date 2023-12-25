/// <reference types="Cypress" />

describe("Trying mongo", function () {
  after(function () {
    cy.task("deletePlanetById", this.insertedId).then((results) => {
      cy.wrap(results).its("acknowledged").should("be.true");
      cy.wrap(results).its("deletedCount").should("be.equal", 1);
    });
  });

  it("Select", function () {
    cy.task("getListing").then((results) => {
      cy.log(results);
      expect(results).to.have.length.greaterThan(1);
      expect(results[0].name).equal("Mercury");
    });
  });

  it("Create", function () {
    const mockPlanet = {
      name: "Kepler-22b",
      orderFromSun: {
        $numberInt: "1",
      },
      hasRings: false,
      mainAtmosphere: [],
      surfaceTemperatureC: {
        min: {
          $numberInt: "-173",
        },
        max: { $numberInt: "427" },
        mean: { $numberInt: "67" },
      },
    };
    cy.task("createPlanet", mockPlanet).then((results) => {
      cy.wrap(results.insertedId).as("insertedId");
      cy.wrap(results).its("acknowledged").should("be.true");
      cy.wrap(results).should("haveOwnPropertyDescriptor", "insertedId");
    });
  });
});
