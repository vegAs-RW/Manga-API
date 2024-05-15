import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { authors } from "../../infrastructure/data/schema";

export type Author = InferSelectModel<typeof authors>;
export type NewAuthor = InferInsertModel<typeof authors>;

export type AuthorColumns = {[K in keyof Author]?:boolean}