import { defineConfig, devices } from "@playwright/test";


// all is being held in one variable
const config = ({
  testDir: "./tests",
  //timeout for overall test - 20 seconds
  timeout: 20 * 1000,
  expect: {
    //timeout for assertions - 5 seconds
    timeout: 5000,
  },

  reporter: "html", // report means how the results are shown
  use: {
    browserName: "chromium", // what browser to use
    headless : false, // means the browser will be visible
    screenshot: "retain-on-failure", // if test fails, take a screenshot
    trace: 'retain-on-failure', // collect trace when test fails, helps debug issues

  },
});

// makes the variable available for all other files
module.exports = config