module.exports = {
    extends: [
      "plugin:prettier/recommended",
      "plugin:mocha/recommended",
      "plugin:cypress/recommended"
    ],
    rules: {
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
    },
    plugins: ["mocha", "cypress"],
    env: {
      "cypress/globals": true
    }
  };
  