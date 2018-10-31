import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Configuring Enzyme.
Enzyme.configure({ adapter: new Adapter() });

/* Configuring React-Testiing-Library.- Currently Not Using
// Also see "tests/reactTestingLibraryHelpers.js". Which used for custom Render which inject Redux Provider and Router.
import "jest-dom/extend-expect"; // Add some helpful assertions
import "react-testing-library/cleanup-after-each"; // This is basically run "afterEach(cleanup)"" after each test to clean up DOM.
*/
