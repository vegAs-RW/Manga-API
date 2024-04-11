export interface Manga {
    id?: string;
    title: string;
    author: string;
    genre: string[];
    status: string;
    chapters?: number;
    description: string;
}