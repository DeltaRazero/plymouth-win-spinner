export default [
  {
    rules: {
      // Assignment statements must always end with a semicolon.
      "semi": ["error", "always"],
      // Function definitions may NOT end with a semicolon.
      "no-extra-semi": "error",
      // Allow both quote types globally so imports don't trigger errors.
      "quotes": "off",
      // Ban single quotes everywhere except in imports/exports.
      "no-restricted-syntax": [
        "error",
        {
          "selector": "Literal[value=/./][raw=/^'/]:not(ImportDeclaration *, ExportNamedDeclaration *, ExportAllDeclaration *)",
          "message": "Strings must use double quotes (except for import/export statements)."
        }
      ]
    }
  }
];
