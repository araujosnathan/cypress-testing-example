import { FormLocators } from "../../support/locators/form";

const configurationAxe = {
  branding: {
    brand: "Swag Labs",
    application: "Swag Labs Demo App",
  },
  reporter: "v2",
  iframes: true,
};
const a11YOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2aa", "section508"],
  },
};

function terminalLog(violations) {
  const violationData = violations.map(
    ({ id, impact, description, help, nodes }) => ({
      id,
      impact,
      description,
      help,
      nodes: nodes,
      nodes_lenght: nodes.length,
    })
  );
  const json = JSON.stringify(violations, null, "\t");
  cy.writeFile(
    "cypress/results/a11y/" + Cypress.currentTest.title + ".axe_result.json",
    json
  );
  cy.task("table", violationData);
}

describe("Accessibility test automation with cypress axe", function() {
  before(function() {
    cy.writeFile("a11yResult.json", "[]");
  });

  it("Form Page", function() {
    cy.visit("/");
    cy.injectAxe();
    cy.configureAxe(configurationAxe);
    cy.get(FormLocators.submit).should("be.visible");
    cy.checkA11y(null, a11YOptions, terminalLog);
  });
});
