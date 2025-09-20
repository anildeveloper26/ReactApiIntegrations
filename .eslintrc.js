    module.exports = {
      // ... other ESLint configurations
      plugins: ["unused-imports"],
      rules: {
        "no-unused-vars": "off", // Disable default unused var rule
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
      },
    };