/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
  testMatch: ["**/?(*.)+(spec|test).(ts|tsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json"
      }
    ]
  },
  transformIgnorePatterns: ["/node_modules/(?!react-leaflet|@react-leaflet)/"]
};
