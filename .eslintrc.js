module.exports = {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 'latest', // Allow the latest ECMAScript features
      sourceType: 'module',  // Ensure it treats the code as modules (for `import`/`export`)
      ecmaFeatures: {
        jsx: true, // If you're using JSX/React
      },
    },
    extends: [
      'eslint:recommended', // Use the recommended ESLint rules
      'plugin:@typescript-eslint/recommended', // Use the recommended TypeScript rules
      'plugin:react/recommended', // If you're using React
    ],
    plugins: ['@typescript-eslint'], // Use the TypeScript ESLint plugin
    settings: {
      react: {
        version: 'detect', // Automatically detect the version of React
      },
    },
    rules: {
      // You can customize any rules here if needed
    },
  };
  