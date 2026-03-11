"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("prisma_demo", // Your database name
"fbistechnew", // Your PostgreSQL username
"", // Your PostgreSQL password (if you have one)
{
    host: "localhost",
    dialect: "postgres", // <--- This is the important change
    port: 5432, // Default PostgreSQL port
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map