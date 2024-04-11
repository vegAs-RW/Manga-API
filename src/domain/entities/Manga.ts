import { MangaAuthor } from "./MangaAuthor";

export interface Manga {
    id?: string;
    title: string;
    genre: string[];
    status: string;
    chapters?: number;
    description: string;
    author?: MangaAuthor[];
}