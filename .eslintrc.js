module.exports = {
  extends: ["react-app", "plugin:jest/recommended"],
  plugins: ["import", "testing-library", "jest"],
  overrides: [
    {
      files: ["**/*.*(ts|tsx)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
  rules: {
    // Won't run for storyshots, this rule hardcodes the .snap ext
    "jest/no-large-snapshots": ["warn", { maxSize: 50, inlineMaxSize: 6 }],
    "import/no-anonymous-default-export": [
      "error",
      {
        allowObject: true,
      },
    ],
    "no-duplicate-imports": "warn",
    "react/jsx-no-useless-fragment": "error",
    "no-restricted-imports": [
      "warn",
      {
        name: "styled-components",
        message: 'Use "styled-components/macro" instead',
      },
      // {
      //   name: "history",
      //   importNames: ["Location", "History"],
      //   message:
      //     "Import useLocation or useHistory from helpers/routingHooksWithState instead",
      // },
    ],
  },
};
