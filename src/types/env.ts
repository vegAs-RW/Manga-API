export interface EnvConfig {
    PORT: number;
    NODE_ENV: 'development' | 'production' | 'test';
    JWT_SECRET: string;
    REFRESH_TOKEN: string;
    FRONTEND_URL: string;
    DATABASE_URL: string;
}