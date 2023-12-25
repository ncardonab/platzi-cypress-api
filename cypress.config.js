const { defineConfig } = require("cypress");
const { MongoClient, ObjectId } = require("mongodb");
const mysql = require("mysql");

async function connect(client) {
  await client.connect();
  return client.db("sample_guides");
}

module.exports = defineConfig({
  env: {
    db: {
      host: "127.0.0.1",
      user: "root",
      password: "newrootpass123",
      database: "cypress_db",
    },
    mongodb: {
      uri: "mongodb+srv://Nico:mongodbbeFXebEMc7@cypress-try.mkffqwb.mongodb.net/?retryWrites=true&w=majority",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryTestDb: (query) => {
          const connection = mysql.createConnection(config.env.db);
          connection.connect();

          return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
              if (error) reject(error);
              else {
                return resolve(results);
              }
            });
          });
        },
        getListing: async () => {
          const client = new MongoClient(config.env.mongodb.uri);
          try {
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.find({}).limit(50).toArray();
          } catch (error) {
            console.error(error);
          } finally {
            await client.close();
          }
        },
        createPlanet: async (planet) => {
          const client = new MongoClient(config.env.mongodb.uri);
          try {
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.insertOne(planet);
          } catch (error) {
            console.error(error);
          } finally {
            await client.close();
          }
        },
        deletePlanetById: async (planetId) => {
          const client = new MongoClient(config.env.mongodb.uri);
          try {
            const db = await connect(client);
            const planets = db.collection("planets");
            return await planets.deleteOne({ _id: ObjectId(planetId) });
          } catch (error) {
            console.error(error);
          } finally {
            await client.close();
          }
        },
      });
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/*.cy.js",
  },
});
