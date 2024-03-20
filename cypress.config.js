const { defineConfig } = require("cypress");
require("dotenv").config({path: './test.env'});

module.exports = defineConfig({
  env: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    url: process.env.URL,
    API_KEY: process.env.API_KEY,
    apiUrl: process.env.API_URL
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
