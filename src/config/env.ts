import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development'
}

export default env;