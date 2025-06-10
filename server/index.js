const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample products data (in a real app, this would come from a database)
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    description: "High-performance laptop for work and gaming",
    category: "Electronics",
    image: "/images/laptop.jpg",
    stock: 10,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    description: "Latest smartphone with advanced features",
    category: "Electronics",
    image: "/images/smartphone.jpg",
    stock: 15,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 129.99,
    description: "Comfortable running shoes for athletes",
    category: "Sports",
    image: "/images/shoes.jpg",
    stock: 20,
  },
];

let cart = [];
let orders = [];

// API Routes

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Add new product (admin)
app.post("/api/products", (req, res) => {
  const { name, price, description, category, image, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    category,
    image,
    stock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product (admin)
app.put("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// Delete product (admin)
app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
});

// Cart Routes

// Get cart
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// Add to cart
app.post("/api/cart", (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: cart.length + 1,
      productId,
      quantity,
      product,
    });
  }

  res.json({ message: "Product added to cart", cart });
});

// Update cart item
app.put("/api/cart/:id", (req, res) => {
  const { quantity } = req.body;
  const cartItem = cart.find((item) => item.id === parseInt(req.params.id));

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  if (quantity <= 0) {
    cart = cart.filter((item) => item.id !== parseInt(req.params.id));
    return res.json({ message: "Item removed from cart", cart });
  }

  cartItem.quantity = quantity;
  res.json({ message: "Cart updated", cart });
});

// Remove from cart
app.delete("/api/cart/:id", (req, res) => {
  cart = cart.filter((item) => item.id !== parseInt(req.params.id));
  res.json({ message: "Item removed from cart", cart });
});

// Clear cart
app.delete("/api/cart", (req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

// Order Routes

// Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Create order
app.post("/api/orders", (req, res) => {
  const { customerInfo, paymentInfo } = req.body;

  if (cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const newOrder = {
    id: orders.length + 1,
    customerInfo,
    items: [...cart],
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  // Update product stock
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock -= item.quantity;
    }
  });

  // Clear cart after order
  cart = [];

  res
    .status(201)
    .json({ message: "Order created successfully", order: newOrder });
});

// Get order by ID
app.get("/api/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "E-commerce API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
