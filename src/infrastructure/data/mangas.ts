import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { authors, categories } from "./";


export const mangas = pgTable('mangas', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', {length: 255}).notNull(),
    description: text('description').notNull(),
    author: uuid('author').references(() => authors.id).notNull(), // FK
    releaseDate: timestamp('releaseDate').notNull(),
    category: varchar('category', {length:255}).references(() => categories.name).notNull() //FK
})