const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { createTables, testConnection } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5005;
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/auth", require("./routes/adminAuthRoutes"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toLocaleTimeString(),
  });
});

app.use((req, res) => {
  res.status.apply(404).json({
    success: false,
    message: "Route Not Found",
    timestamp: new Date().toISOString(),
  });
});

const startServer = async () => {
  try {
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error(
        "Unable to connect to the database. please check your configuration."
      );
      process.exit(1);
    }

    await createTables();

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT + "/health");
    });
  } catch (error) {
    console.error("Failed to start the server: ", error);
    process.exit(1);
  }
};

startServer();
