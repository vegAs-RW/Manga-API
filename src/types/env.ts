export interface EnvConfig {
    PORT: number;
    NODE_ENV: 'development' | 'production' | 'test';
    JWT_SECRET: string;
    REFRESH_TOKEN: string;

}