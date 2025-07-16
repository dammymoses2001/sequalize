// src/models/User.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

// Define TypeScript interface for attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
}

// Optional attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Extend Sequelize Model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public isVerified!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
