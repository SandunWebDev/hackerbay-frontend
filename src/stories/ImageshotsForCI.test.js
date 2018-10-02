/* VISUAL REGRESSION TESTING FOR CI VERSION
*  In here We do screenshots against the "static build" of the storybook because in CI storybook dev server wont be running.
*  So make sure you must build the static version of the storybook *before* running this test suite. (npm run build-storybook && npm run test:imageshotsCI)
*  In here enable/convert all stories as "Image Screenshot" testing cases using Jest imageSnapshot.
*/

import path from "path";
import initStoryshots, { imageSnapshot } from "@storybook/addon-storyshots";

const pathToStorybookStatic = path.join(
  __dirname,
  "../../",
  "storybook-static"
);

const imageMatchOptions = ({ context: { kind, story }, url }) => {
  return {
    failureThreshold: 0.2,
    failureThresholdType: "percent"
  };
};

initStoryshots({
  suite: "Imageshots",
  test: imageSnapshot({
    storybookUrl: `file://${pathToStorybookStatic}`,
    imageMatchOptions
  })
});
