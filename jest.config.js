module.exports = {
    moduleNameMapper: {
        "^./Backend/database/db$": "<rootDir>/Backend/__mocks__/sequelize.js",
    },
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/Backend/test/setupTests.js"],
};
