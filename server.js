const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let orders = [];
let reservations = [];

// PRE-ORDER
app.post("/order", (req, res) => {
  if (!req.body.name) {
    return res.json({ error: "Name is required" });
  }

  const order = {
    id: Date.now(),
    name: req.body.name,
    items: req.body.items,
    total: req.body.total,
    status: "Preparing"
  };

  orders.push(order);

  res.json({ message: "Order Confirmed", order });
});

// ORDER STATUS
app.get("/order/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  res.json(order || { error: "Not found" });
});

// RESERVATION
app.post("/reserve", (req, res) => {
  reservations.push(req.body);
  res.json({ message: "Table Reserved" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
