const express = require("express");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/tasks", tasksRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route introuvable." });
});

module.exports = app;
