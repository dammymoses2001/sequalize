import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "prisma_demo", // Your database name
  "fbistechnew", // Your PostgreSQL username
  "", // Your PostgreSQL password (if you have one)
  {
    host: "localhost",
    dialect: "postgres", // <--- This is the important change
    port: 5432, // Default PostgreSQL port
    logging: false,
  }
);

export default sequelize;
