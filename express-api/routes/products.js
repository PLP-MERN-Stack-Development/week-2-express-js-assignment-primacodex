const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = require("../data/products");
const products = [];
const { validateProduct } = require("../middleware/validation");
const { authenticate } = require("../middleware/auth");
const { NotFoundError } = require("../middleware/errors");

// GET /api/products
router.get("/", (req, res) => {
  let result = products;
  const { category, page = 1, limit = 10, search } = req.query;

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  res.json(result.slice(start, end));
});

// GET /api/products/:id
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
});

// POST /api/products
router.post("/", authenticate, validateProduct, (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
});

// PUT /api/products/:id
router.put("/:id", authenticate, validateProduct, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete("/:id", authenticate, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
