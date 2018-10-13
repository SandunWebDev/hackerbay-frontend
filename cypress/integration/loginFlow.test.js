import { configsOf } from "../../src/configs/main";
import {
  userLogin_SucessfullResponse,
  userLogin_FailedResponse
} from "../fixtures/responses/userAuthResponses";

const backendAPIBaseURL = configsOf("test").API.baseURL;

describe("Login Flow", () => {
  it("Should login sucessfully when valid data provided.", () => {
    // Stubbing backend API.
    cy.server();
    cy.route({
      method: "POST",
      url: backendAPIBaseURL + "/user/login",
      status: 200,
      response: userLogin_SucessfullResponse
    });

    cy.visit("/");

    // Goto LogIn page.
    cy.contains("Login").click();

    cy.location("pathname").should("eq", "/login");

    cy.get("input[name = email]").type("johndoe@gmail.com");
    cy.get("input[name = password]").type("supersecret");

    // Submitting login details.
    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", "/");
    cy.get("[data-testid=myAccountButton]").contains("JOHN DOE");

    // LogOut
    cy.contains("LogOut").click();
    cy.get("[data-testid=myAccountButton]").should("not.exist");
    cy.contains("Login");
  });

  it("Should failed and show errors when login failed.", () => {
    // Stubbing backend API.
    cy.server();
    cy.route({
      method: "POST",
      url: backendAPIBaseURL + "/user/login",
      status: 400,
      response: userLogin_FailedResponse
    });

    cy.visit("/login");

    cy.get("input[name = email]").type("johndoe@gmail.com");
    cy.get("input[name = password]").type("supersecret");

    // Submitting login details.
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=authFormCallout]").contains("Login Failed");
    cy.get("[data-testid=authFormCallout]").contains("User already exist");

    cy.location("pathname").should("eq", "/login");
    cy.get("[data-testid=myAccountButton]").should("not.exist");
    cy.contains("Login");
  });
});
