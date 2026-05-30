
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cars = sqliteTable("cars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(), // Sedan, SUV, Sports, Electric, Luxury
  price: integer("price").notNull(),
  color: text("color").notNull(),
  availability: integer("availability", { mode: 'boolean' }).default(true),
  quantity: integer("quantity").notNull(),
  image: text("image").notNull(),
  interiorImage: text("interior_image"),
  detailImage: text("detail_image"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone").notNull(),
  carId: integer("car_id").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).default(new Date()),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).default(new Date()),
});

// Schemas
export const insertCarSchema = createInsertSchema(cars).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

// Types
export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;
