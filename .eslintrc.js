module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:storybook/recommended"],
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
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
      settings: {
        "import/resolver": {
          typescript: {},
        },
      },
    },
  ],
  rules: {
    // Won't run for storyshots, this rule hardcodes the .snap ext
    "jest/no-large-snapshots": [
      "warn",
      {
        maxSize: 50,
        inlineMaxSize: 6,
      },
    ],
    "import/no-anonymous-default-export": [
      "error",
      {
        allowObject: true,
      },
    ],
    "react/jsx-no-useless-fragment": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "styled-components",
            message: 'Use "styled-components/macro" instead',
          },
        ],
        patterns: ["@/features/*/*"],
      },
    ],
    "no-duplicate-imports": "warn",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "after",
          },
        ],
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
  },
};
