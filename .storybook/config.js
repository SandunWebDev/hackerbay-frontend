import { configure, addDecorator, setAddon, storiesOf } from "@storybook/react";

import { withInfo } from "@storybook/addon-info";
import { setConsoleOptions } from "@storybook/addon-console";
import backgrounds from "@storybook/addon-backgrounds";
import JSXAddon from 'storybook-addon-jsx';

// All global styles
import "../src/index.css";

//  *********** Configuring global addons *********** .
addDecorator((story, context) => withInfo("Common Info")(story)(context)); // Display useful info about component.

// Display console logs right in storybook. We could have use "addDecorator((storyFn, context) => withConsole({})(storyFn)(context));" but it mess us jest snapshots.
setConsoleOptions({});

// Add several background color pallet so we can examine how our component look like in different backgrounds.
addDecorator(
  backgrounds([
    { name: "White", value: "#ffffff", default: true },
    { name: "Black", value: "#000000" },
    { name: "LightGreen", value: "#d3f9b5" },
    { name: "Brown", value: "#3d0c11" }
  ])
);

// Display JSX of component when used with ".addWithJSX()"
setAddon(JSXAddon);


//  *********** Setting up all stories *********** .
// Recrusivly getting all "xxxx.stories.js" files list inside "/src/components/" using WebPack context.
const storiesInComponentsFolder = require.context(
  "../src/components",
  true,
  /\.stories\.js$/
);

function loadStories() {
  storiesInComponentsFolder // Loading "xxxx.stories.js" files.
    .keys()
    .forEach(filename => storiesInComponentsFolder(filename)); 
  // Add here any other folder you want to load stories from. Ex: require("../src/stories");
}

configure(loadStories, module);
