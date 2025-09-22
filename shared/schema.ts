import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull().default("free"),
  storageUsed: integer("storage_used").notNull().default(0),
  storageLimit: integer("storage_limit").notNull().default(107374182400), // 100GB in bytes
});

export const files = pgTable("files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  isPublic: boolean("is_public").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  storageUsed: true,
  storageLimit: true,
});

export const insertFileSchema = createInsertSchema(files).omit({
  id: true,
  uploadDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type File = typeof files.$inferSelect;
