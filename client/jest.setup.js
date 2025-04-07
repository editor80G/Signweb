import "@testing-library/jest-dom";

// filepath: jest.setup.js
// global.importMetaEnv = {
//     VITE_BASE_URL: "http://localhost:3000", // Mock your base URL
// };

// Object.defineProperty(global, "import", {
//     value: {
//         meta: {
//             env: global.importMetaEnv,
//         },
//     },
// });

// Mock process.env for Jest
process.env.VITE_BASE_URL = "http://localhost:3000";