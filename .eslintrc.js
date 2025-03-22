module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    globals: {
        React: 'readonly',
    },
    extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'standard', 'plugin:prettier/recommended', 'react-app',],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/prop-types': 'off',
        'react/jsx-no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
    },
};
