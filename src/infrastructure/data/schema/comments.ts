import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { mangas, users } from '.';


export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    mangasId: uuid('mangaId').references(() => mangas.id).notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    content: text('content').notNull(),
    date: timestamp('date').defaultNow().notNull()
})