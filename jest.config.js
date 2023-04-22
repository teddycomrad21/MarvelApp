module.exports = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};