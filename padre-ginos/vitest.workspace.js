import { defineWorkspace } from "vitest/config";

// we are defining two evn:
export default defineWorkspace([
  //  happy-dom env for our old tests
  {
    extends: "./vite.config.js",
    test: {
      name: "happy-dom", // to give those tests a label
      environment: "happy-dom",
      include: ["**/*.node.test.{js,jsx}"],
    },
  },
  // and playwright for our new browser-based tests
  {
    extends: "./vite.config.js",
    test: {
      name: "browser",
      setupFiles: ["vitest-browser-react"], // this runs before our tests
      include: ["**/*.browser.test.{js,jsx}"],
      browser: {
        name: "chromium", // the browser to test in "chromium or firefox or webkit(safari) here too"
        provider: "playwright",
        enabled: true,
      },
    },
  },
]);
