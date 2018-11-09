import React from "react";
import { shallow, mount } from "enzyme";

import {
  withReduxAndRouter,
  withReduxProvider,
  withReactRouter
} from "../../../tests/helpers/enzymeHelpers";
import createMockStore from "../../../tests/helpers/createMockStore";

import Header, { Header as HeaderUnconnected } from "./Header";

describe("Header Component", () => {
  it("Should get renderd with out error.", () => {
    shallow(
      <HeaderUnconnected name="" loggedIn={false} logoutAccount={() => {}} />
    );
  });

  it("Should get needed props from redux store.", () => {
    // Mock store withs production's default state.
    const mockStore = createMockStore({}, true);

    const wrappedHeader = shallow(withReduxProvider(<Header />)).dive({
      context: { store: mockStore }
    });

    expect(wrappedHeader.props()).toHaveProperty("name");
    expect(wrappedHeader.props()).toHaveProperty("loggedIn");
    expect(wrappedHeader.props()).toHaveProperty("logoutAccount");
  });

  it("Should have main logo link which link to '/'", () => {
    const wrappedHeader = mount(withReduxAndRouter(<Header />));

    expect(
      wrappedHeader.find("Link[data-testid='hackerbayMainLogoLink']").props().to
    ).toEqual("/");
  });

  describe("When loggedIn prop is false", () => {
    it("Should render LOGIN and SIGNUP buttons which links to respective pages & not render links to DASHBOARD and MYACCOUNT.", () => {
      const wrappedHeaderUnconnected = mount(
        withReactRouter(
          <HeaderUnconnected
            loggedIn={false}
            name=""
            logoutAccount={() => {}}
          />
        )
      );

      const rightSideMenu = wrappedHeaderUnconnected.find(
        "[data-testid='rightSideMenu']"
      );

      expect(rightSideMenu.find("Link[to='/signup']").exists()).toEqual(true);
      expect(rightSideMenu.find("Link[to='/login']").exists()).toEqual(true);
      expect(rightSideMenu.find("Link[to='/myaccount']").exists()).toEqual(
        false
      );
      expect(rightSideMenu.find("Link[to='/dashboard']").exists()).toEqual(
        false
      );
    });
  });

  describe("When loggedIn prop is true", () => {
    it("Should render DASHBOARD, MYACCOUNT, LOGOUT buttons which links to respective pages.", () => {
      const wrappedHeaderUnconnected = mount(
        withReactRouter(
          <HeaderUnconnected
            loggedIn={true}
            name="John Doe"
            logoutAccount={() => {}}
          />
        )
      );

      const rightSideMenu = wrappedHeaderUnconnected.find(
        "[data-testid='rightSideMenu']"
      );

      expect(rightSideMenu.find("Link[to='/dashboard']").exists()).toEqual(
        true
      );
      expect(rightSideMenu.find("Link[to='/myaccount']").exists()).toEqual(
        true
      );
      expect(rightSideMenu.find("Link[to='/dashboard']").exists()).toEqual(
        true
      );
    });

    it("Should render only first part of user's name in the button which link to '/myaccount'", () => {
      const wrappedHeaderUnconnected = mount(
        withReactRouter(
          <HeaderUnconnected
            loggedIn={true}
            name="john Doe"
            logoutAccount={() => {}}
          />
        )
      );

      const myAccountButton = wrappedHeaderUnconnected.find(
        "button[data-testid='myAccountButton']"
      );

      expect(myAccountButton.contains("john")).toEqual(true);
    });

    it("Should excute logout() function when LogOut button is clicked.", () => {
      const mockLogoutFn = jest.fn();

      const wrappedHeaderUnconnected = mount(
        withReactRouter(
          <HeaderUnconnected
            loggedIn={true}
            name="John Doe"
            logoutAccount={mockLogoutFn}
          />
        )
      );

      const logoutButton = wrappedHeaderUnconnected.find(
        "button[data-testid='logoutButton']"
      );

      logoutButton.simulate("click");

      expect(mockLogoutFn).toHaveBeenCalled();
    });

    it("Should excute LogOut button is clicked loggedIn props should be false.", () => {
      // Making sure user is initially logged in.
      const wrappedHeader = mount(
        withReduxAndRouter(
          <Header />,
          {
            user: {
              loggedIn: true,
              name: "John Doe"
            }
          },
          false,
          true // Say need a actual store similar to production redux store.
        )
      );

      const logoutButton = wrappedHeader.find(
        "button[data-testid='logoutButton']"
      );

      logoutButton.simulate("click");

      expect(wrappedHeader.find("Header").props().loggedIn).toEqual(false);
    });
  });
});
