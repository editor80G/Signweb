const config = {
    // For Jest testing environment use process.env.VITE_BASE_URL
    // baseUrl: process.env.VITE_BASE_URL || "http://localhost:3000",
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
};

export default config;