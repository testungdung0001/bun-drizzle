import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import { accountsTable } from "../db/schema";

const conn = postgres({
  host: Bun.env.DB_HOST,
  port: Number(Bun.env.DB_PORT) || 5432,
  username: Bun.env.DB_USERNAME,
  password: Bun.env.DB_PASSWORD,
  database: Bun.env.DB_DATABASE,
  max: 20,
  idle_timeout: 30,
  connect_timeout: 10,
  max_lifetime: 3600,
  onnotice: function(notice) {
    console.log(notice)
  },
  onclose: function(conID) {
    console.log('Connection closed '+conID);
  }
});
export const db = drizzle(conn,
  {
    logger: true,
  }
);