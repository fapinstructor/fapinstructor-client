import initStoryshots from "@storybook/addon-storyshots";
import { styleSheetSerializer } from "jest-styled-components";
import { render, waitForSuspense } from "test/test-utils";

initStoryshots({
  asyncJest: true,
  snapshotSerializers: [styleSheetSerializer],
  test: ({ story, context, stories2snapsConverter, done }) => {
    // Use .snap for storyshot tests so eslint snapshot rules are applied
    const snapshotFileName =
      stories2snapsConverter.getSnapshotFileName(context);
    const storyElement = story.render();

    // Mount component
    const { container } = render(storyElement);

    waitForSuspense().then(() => {
      expect(container.firstChild).toMatchSpecificSnapshot(snapshotFileName);
      done && done();
    });
  },
});
