import { Hono } from "hono";
import { db } from "./utils/db";
import { redisClient } from "./utils/redis";
import { logger } from "hono/logger";
const app = new Hono();

console.log(await db.execute('select 1'));
console.log(await redisClient.set('hello','world'));

app.use(logger());
app.get("/", (c) => c.text("Hono!"));

export default app;
