require("dotenv").config();

const express = require("express");
const { json, urlencoded } = require("express");
const app = express();
const cors = require("cors");
const appRouter = require("./routes");

app.use(cors()); // Add cors middleware

// Initializing bodyparser
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

// load app routes
app.use("/api/v1", appRouter);
app.all("*", (_, res) =>
  res.status(404).json({ success: false, message: "path not found" })
);

app.listen(process.env.PORT || 8006, () =>
  console.log(`Server is running on port ${process.env.PORT || 8006}`)
);
