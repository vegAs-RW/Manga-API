import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { mangas } from "../../infrastructure/data/schema";

export type Manga = InferSelectModel<typeof mangas>;
export type NewManga = InferInsertModel<typeof mangas>
export type MangaColumns = {[K in keyof Manga]?:boolean}