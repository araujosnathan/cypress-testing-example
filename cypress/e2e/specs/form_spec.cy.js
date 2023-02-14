import { FormLocators } from "../../support/locators/form";
import { faker } from "@faker-js/faker";
import { errorMessages } from "../../support/utils";

const commonData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  agreement: true,
};

describe("Form", function () {
  beforeEach("Go to the Website", function () {
    commonData.firstName = faker.name.firstName();
    commonData.lastName = faker.name.lastName();
    commonData.email = faker.internet.email();
    commonData.phoneNumber = faker.phone.number("#########");
    commonData.gender = "Male";
    cy.visit("/");
  });

  it("Should return success when submiting with all required field for Male", function () {
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return success when submiting with First Name with 25 characters", function () {
    (commonData.firstName = "First Name With 25 charac"),
      cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return success when submiting with First Name with 2 characters", function () {
    (commonData.firstName = "Fi"), cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return success when submiting with Last Name with 25 characters", function () {
    commonData.lastName = "Last Name With 25 charact";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return success when submiting with Last Name with 2 characters", function () {
    commonData.lastName = "La";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return success when submiting with all required field for Female", function () {
    (commonData.gender = "Female"), cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.expectAlertMessage(commonData);
  });

  it("Should return error when First Name is Empty", function () {
    cy.fillForm(commonData);
    cy.get(FormLocators.firstName).clear();
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.firstNameError
    );
  });

  it("Should return error when First Name has more than 25 chars", function () {
    commonData.firstName = "First Name with more then 25 characters";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.firstNameError
    );
  });

  it("Should return error when First Name has less than 2 chars", function () {
    commonData.firstName = "F";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.firstNameError
    );
  });

  it("Should return error when Last Name is Empty", function () {
    cy.fillForm(commonData);
    cy.get(FormLocators.lastName).clear();
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.lastNameError
    );
  });

  it("Should return error when Last Name has more than 25 chars", function () {
    commonData.lastName = "Last Name with more then 25 characters";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.lastNameError
    );
  });

  it("Should return error when Last Name has less than 2 chars", function () {
    commonData.lastName = "L";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.lastNameError
    );
  });

  it("Should return error when Email is Empty", function () {
    cy.fillForm(commonData);
    cy.get(FormLocators.email).clear();
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.emailError
    );
  });

  it("Should return error when Email is not correct format", function () {
    commonData.email = "email.com";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.emailError
    );
  });

  it("Should return error when Phone Number is Empty", function () {
    cy.fillForm(commonData);
    cy.get(FormLocators.phoneNumber).clear();
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.phoneNumberError
    );
  });

  it("Should return error when Phone Number is incorret format", function () {
    commonData.phoneNumber = "999-999-999";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.phoneNumberError
    );
  });

  it("Should return error when Phone Number is has more than 12 characters", function () {
    commonData.phoneNumber = "9999999999913";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.phoneNumberError
    );
  });

  it("Should return error when Agreement is not accepted", function () {
    cy.fillForm(commonData);
    cy.get(FormLocators.submit).click();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.agreementError
    );
  });

  it("Should return error when Gender is not choosen", function () {
    commonData.gender = "None";
    cy.fillForm(commonData);
    cy.acceptAgreementAndSubmit();
    cy.get(FormLocators.errorMessage).should(
      "have.text",
      errorMessages.genderError
    );
  });

  it("Should return all errors when data is empty", function () {
    cy.get(FormLocators.submit).click();
    cy.get(FormLocators.errorMessage).should("have.length", 6);
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.lastNameError
    );
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.firstNameError
    );
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.emailError
    );
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.phoneNumberError
    );
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.genderError
    );
    cy.get(FormLocators.errorMessage).should(
      "contain",
      errorMessages.agreementError
    );
  });

  it("Should disappear all errors when data is fill correctly", function () {
    cy.get(FormLocators.submit).click();
    cy.get(FormLocators.errorMessage).should("have.length", 6);
    cy.fillForm(commonData);
    cy.get(FormLocators.agreement).click();
    cy.get(FormLocators.errorMessage).should("not.exist");
  });
});
