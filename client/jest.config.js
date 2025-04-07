export default {
    testEnvironment: "jsdom", // Use jsdom for React testing
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Use babel-jest to transform JSX
    },
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ["../client/jest.setup.js"], // Optional setup file
};