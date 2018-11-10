import React from "react";
import securePage from "./securePage";

describe("HOC - securePage()", () => {
  it("Should return provided onSuccessComponent when isSecured is true.", () => {
    const onSuccessComponent = <div>Hello</div>;

    const securePageRetunValue = securePage(true, onSuccessComponent);

    expect(securePageRetunValue).toEqual(onSuccessComponent);
  });

  it("Should return <Redirect/> with specified path when isSecured is false.", () => {
    const onSuccessComponent = <div>Hello</div>;
    const onFailureRedirect = "/abcd";

    const securePageRetunValue = securePage(
      false, // Mocking NOT SECURE
      onSuccessComponent,
      onFailureRedirect
    );

    expect(securePageRetunValue).not.toEqual(onSuccessComponent);
    expect(securePageRetunValue.props.to).toEqual(onFailureRedirect);
  });

  it("Should return <Redirect/> with ROOT path when function called with no arguments.", () => {
    const securePageRetunValue = securePage();

    expect(securePageRetunValue.props.to).toEqual("/");
  });
});
