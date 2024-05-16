import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
    JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || "dxgbvxdgdsfgd",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres:JordanAlex11@localhost:5432/manga",
}

export default env;