const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");
const { errorHandler } = require("./middleware/errors");
const productRoutes = require("./routes/products");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(bodyParser.json());
app.get("/", (req, res) =>
  res.send(
    "Welcome to the Product API! Go to /api/products to see all products."
  )
);
app.use("/api/products", productRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
module.exports = app;
