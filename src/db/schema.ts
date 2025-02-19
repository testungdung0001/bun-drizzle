import { char, integer, pgEnum, pgSchema, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const defaultSchema = pgSchema("s1");

export const accountsTable = defaultSchema.table("accounts", {
  account_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  phone: char({ length: 20 }).notNull(),
  create_ts: timestamp({ withTimezone: true }),
  update_ts: timestamp({ withTimezone: true }),
});
export type SelectUser = typeof accountsTable.$inferSelect;
export type InsertUser = typeof accountsTable.$inferInsert;


export const partnerTypeEnum = defaultSchema.enum('type', ['partner','transportation_partner']);
export type PartnerTypeEnum = (typeof partnerTypeEnum.enumValues)[number];
export const partnersTable = defaultSchema.table("partners", {
  object_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  type: partnerTypeEnum().notNull(),
});
export type SelectPartner = typeof partnersTable.$inferSelect;
export type InsertPartner = typeof partnersTable.$inferInsert;

export const carsTable = defaultSchema.table("cars", {
  car_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  car_num: varchar({ length: 255 }).notNull(),
  type: partnerTypeEnum().notNull(),
});
export type SelectCar = typeof carsTable.$inferSelect;
export type InsertCar = typeof carsTable.$inferInsert;

