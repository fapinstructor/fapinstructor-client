# Adding a New Task

Below is a mini tutorial on how to add a new action called `testAction`. This action will display a simple notification and will wait for the user to click the button labeled `Done` before dismissing it.

1.  First we will create a new file called `testAction.js` and that will reside within the foloder `game/actions/`. All actions are present within this folder, nested folders to organize actions types can be used.

2.  Within this file we will place the following code.

```js
import createNotification, {
  dismissNotification,
} from "engine/createNotification";

// A promise must be returned in this case async for actions that need to 'wait' for user input
const testAction = async () => {
  // This code will be immediately executed when the action is used.
  const notificationId = createNotification({
    message: "Test Action",
    duration: -1,
  });

  // We create a response function that returns a promise to handle what happens after the user clicks the button
  const done = async () => {
    dismissNotification(notificationId);
  };
  // Make sure you attach the label property, this is the text shown in the button
  done.label = "Done";

  // Return the response action.  You can return multiple response functions.
  return [done];
};
// Attach the label property, this is currently reference by the pick your poison action to generate buttons
testAction.label = "Test Action";

export default testAction;
```

3.  You will now have to add your newly created `testAction` to the action index for it to be actionable within the game.
    Within **`game/actions/index.js`** make the following changes. (Do not use `game/index.js`)

```js
// import your new action
import testAction from "./testAction";
// required additionally:
import createProbability from "./utils/createProbability";

...
const initializeActions = taskConfigs =>
  [
    // We use a task configuration to determine if the task is active. We will get to this in the next step.
    // createProbability takes your action and the probability percentage the action will be invoked
    taskConfigs.testAction && createProbability(testAction, 5),
    // other actions
  ].filter(action => !!action);
```

4.  Now you must configure your new `testAction` by specifiying it's default disabled value within `src/configureStore.js`

```js
import store from "store";

const defaultConfig = {
  ...
  tasks: {
    testAction: true
    // other actions
    ...
  }
};
```

5.  You must add the ability for the user to enable or disable the action. This is done within the `containers/Views/ConfigPage.js`

```js
<TaskList
  title="Misc."
  tasks={{
    // other actions
    ...
    otherAction: "other Action" ,
    testAction: "Test Action"
  }}
/>
```

6.  To test your new action, I like to set it's probability to 100 within the `actions/index.js` file, disable all other actions on the `ConfigPage` after launching the application. Your action should be triggered within a few seconds.
