import express from "express";
import sequelize from "./sequelize/db";
import userRoutes from "./routes/user.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
});
