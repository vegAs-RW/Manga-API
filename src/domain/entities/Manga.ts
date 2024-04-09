export interface Manga {
    id?: number;
    title: string;
    author: string;
    genre: string[];
    status: string;
    chapters?: number;
    description: string;
}