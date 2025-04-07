import jestConfig from "./config.jest.js";
import viteConfig from "./config.vite.js";

const config =
    typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined
        ? jestConfig
        : viteConfig;

export default config;