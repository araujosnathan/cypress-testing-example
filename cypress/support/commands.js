import { FormLocators } from "./locators/form"

Cypress.Commands.add('fillForm', (data) => {
    cy.get(FormLocators.firstName).type(data.firstName);
    cy.get(FormLocators.lastName).type(data.lastName);
    cy.get(FormLocators.email).type(data.email);
    cy.get(FormLocators.phoneNumber).type(data.phoneNumber);
    if(!data.gender.includes("None")) cy.get(FormLocators.gender.replace("gender", data.gender)) .click();
})

Cypress.Commands.add('acceptAgreementAndSubmit', () => {
    cy.get(FormLocators.agreement).click();
    cy.get(FormLocators.submit).click();
})

Cypress.Commands.add('expectAlertMessage', (data) => {
    const alertMessage = `{"FirstName":"${data.firstName}","LastName":"${data.lastName}","Email":"${data.email}","PhoneNumber":"${data.phoneNumber}","Gender":"${data.gender}","Agreement":${data.agreement}}`
    cy.on('window:alert', (str) => {
        expect(str).to.equal(alertMessage)
      })
})


