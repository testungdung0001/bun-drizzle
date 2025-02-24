const { drizzle } = require('drizzle-orm/node-postgres');
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const fs = require('fs').promises;

function getConnectionString(customerId) {
  // In production, fetch credentials securely
  return `postgres://postgres:password@localhost:5432/db_${customerId}`;
}

async function migrateCustomerDatabase(customerId) {
  const db = drizzle(getConnectionString(customerId));

  try {
    console.log(`Migrating database for ${customerId}...`);
    await migrate(db, { migrationsFolder: './migrations' });
    console.log(`Migration completed for ${customerId}`);
  } catch (error) {
    throw error;
    console.error(`Migration failed for ${customerId}:`, error);
  } finally {
  }
}

async function migrateAllCustomers() {
  try {
    // Load customer list
    const customers = JSON.parse(await fs.readFile('./customers.json', 'utf-8'));

    // Run migrations sequentially (or use Promise.all for parallel execution)
    for (const customerId of customers) {
      await migrateCustomerDatabase(customerId);
    }

    console.log('All customer migrations completed.');
  } catch (error) {
    console.error('Error during migration process:', error);
  }
}

// Run the script
migrateAllCustomers();