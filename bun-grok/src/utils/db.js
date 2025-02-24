import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/pg-core';

// Store pools and db instances in memory
export const pools = new Map();
export const dbInstances = new Map();

export function getConnectionString(customerId) {
  // In production, fetch this securely (e.g., from environment variables or a vault)
  return `postgres://postgres:password@localhost:5432/db_${customerId}`;
}

export function getDbInstance(customerId) {
  if (!dbInstances.has(customerId)) {
    const pool = new Pool({
      connectionString: getConnectionString(customerId),
      // Optional: Configure pool settings
      max: 10, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30s
    });

    const db = drizzle(pool);
    pools.set(customerId, pool);
    dbInstances.set(customerId, db);
  }
  return dbInstances.get(customerId);
}