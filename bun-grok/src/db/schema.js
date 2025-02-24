import { pgTable, serial, text } from 'drizzle-orm/pg-core';

const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  name2: text('name2').notNull(),
});

module.exports = { items };