import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const authors = pgTable('authors', {
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: varchar('fullName', {length: 255}).notNull(),
    description: text('description').notNull(),
    birthdate: timestamp('birthdate').notNull()
})