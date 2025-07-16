"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
// Extend Sequelize Model
class User extends sequelize_1.Model {
}
// Define the model
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_1.default,
    modelName: "User",
    tableName: "users",
});
exports.default = User;
//# sourceMappingURL=user.js.map