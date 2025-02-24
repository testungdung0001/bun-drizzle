import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.js', // Path to your schema file
  out: './migrations',    // Directory where migrations will be generated
  dialect: 'postgresql',  // Match your database
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'db_placeholder', // Temporary placeholder (we’ll override this)
  },
});