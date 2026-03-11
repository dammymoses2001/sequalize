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

// Health check: confirm DB is connected (GET /health)
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res
      .status(503)
      .json({
        status: "error",
        database: "disconnected",
        error: (err as Error).message,
      });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
