// VISUAL REGRESSION TESTING FOR LOCAL RUN
// Make sure "storybook developement server" is already running before running these tests. (npm run storybook && npm run test:imageshotsLocal)
// In here enable/convert all stories as "Image Screenshot" testing cases using Jest imageSnapshot.

import initStoryshots, { imageSnapshot } from "@storybook/addon-storyshots";

const imageMatchOptions = ({ context: { kind, story }, url }) => {
  return {
    failureThreshold: 0.2,
    failureThresholdType: "percent"
  };
};

initStoryshots({
  suite: "Imageshots",
  test: imageSnapshot({
    storybookUrl: "http://localhost:9009",
    imageMatchOptions
  }),
  storyNameRegex: /^((?!\[SKIP-IMAGESHOTS\]).)*$/ // Any story name that has "[SKIP-IMAGESHOTS]" get excluded from running in this test suite.
});
