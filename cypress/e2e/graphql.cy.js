describe("Testing graphql", function () {
  it("should query an object in graphql", function () {
    const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          next
          previous
          status
          results {
            url
            name
            image
          }
        }
      }`;

    const gqlVariables = {
      limit: 20,
      offset: 3,
    };

    cy.request({
      method: "POST",
      url: "https://graphql-pokeapi.graphcdn.app/",
      body: {
        query: gqlQuery,
        variables: gqlVariables,
      },
    }).then((response) => {
      const { pokemons } = response.body.data;
      expect(pokemons.results[0].name).to.equal("charmander");
      cy.wrap(pokemons.results)
        .its(0)
        .its("name")
        .should("equal", "charmander");
    });
  });
});
