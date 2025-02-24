import express, { json } from "express";
import { getDbInstance } from "./utils/db";
const app = express();

app.use(json());

app.use((req, res, next) => {
  const customerId = req.headers["x-customer-id"];
  if (!customerId) {
    return res.status(400).json({ error: "Missing customer ID" });
  }
  req.customerId = customerId;
  next();
});

app.get("/api/items", async (req, res) => {
  try {
    const db = getDbInstance(req.customerId);
    const result = await db.select().from(items);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const db = getDbInstance(req.customerId);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }
    const result = await db.insert(items).values({ name }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function closeAllPools() {
  for (const pool of pools.values()) {
    await pool.end();
  }
}

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await closeAllPools();
  process.exit(0);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

