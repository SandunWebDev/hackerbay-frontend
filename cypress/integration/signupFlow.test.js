import { configsOf } from "../../src/configs/main";
import {
  userLogin_SucessfullResponse,
  userLogin_FailedResponse
} from "../fixtures/responses/userAuthResponses";

const backendAPIBaseURL = configsOf("test").API.baseURL;

describe("Signup Flow", () => {
  it("Should signup sucessfully when valid data provided.", () => {
    // Stubbing backend API.
    cy.server();
    cy.route({
      method: "POST",
      url: backendAPIBaseURL + "/user/signup",
      status: 200,
      response: userLogin_SucessfullResponse
    });

    cy.visit("/");

    // Goto Signup page.
    cy.contains("Signup").click();

    cy.location("pathname").should("eq", "/signup");

    cy.get("input[name = name]").type("John Doe");
    cy.get("input[name = email]").type("johndoe@gmail.com");
    cy.get("input[name = password]").type("supersecret");
    cy.get("input[name = passwordConfirm]").type("supersecret");
    cy.get("input[name = phoneNum]").type("+947612345678");

    // Submitting signup details.
    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/dashboard");
    cy.get("[data-testid=myAccountButton]").contains("John");

    // LogOut
    cy.contains("LogOut").click();
    cy.get("[data-testid=myAccountButton]").should("not.exist");
    cy.contains("Signup");
  });

  it("Should failed and show errors when signup failed.", () => {
    // Stubbing backend API.
    cy.server();
    cy.route({
      method: "POST",
      url: backendAPIBaseURL + "/user/signup",
      status: 400,
      response: userLogin_FailedResponse
    });

    cy.visit("/signup");

    cy.get("input[name = name]").type("John Doe");
    cy.get("input[name = email]").type("johndoe@gmail.com");
    cy.get("input[name = password]").type("supersecret");
    cy.get("input[name = passwordConfirm]").type("supersecret");
    cy.get("input[name = phoneNum]").type("+947612345678");

    // Submitting login details.
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=authFormCallout]").contains("Signup Failed");
    cy.get("[data-testid=authFormCallout]").contains("User already exist");

    cy.location("pathname").should("eq", "/signup");
    cy.get("[data-testid=myAccountButton]").should("not.exist");
    cy.contains("SignUp");
  });
});
