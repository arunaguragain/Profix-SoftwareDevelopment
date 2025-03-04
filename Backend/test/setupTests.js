jest.mock("../database/db", () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();

    return dbMock;
});
