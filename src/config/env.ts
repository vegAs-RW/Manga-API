import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
    JWT_SECRET: process.env.JWT_SECRET || "MonS3cr3tTropBienGardé123:!",
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || "dxgbvxdgdsfgd"
}

export default env;