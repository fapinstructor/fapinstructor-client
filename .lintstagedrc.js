// bash -c will execute the script without passing in the file names.
module.exports = {
  "**/*": ["yarn check-format", "yarn test:ci"],
  "**/*.+(ts|tsx)": "bash -c 'yarn check-types'",
  "**/*.+(ts|tsx|js|snap)": "bash -c 'yarn lint'",
};
