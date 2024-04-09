import { Response } from "express";

export interface INormalized {
    statusCode: number;
    message: string;
    data?: string[] | object | null | undefined;
}

export const APIResponse = (res: Response, normalized: INormalized): Response => {
    res.setHeader("X-powered-By", "Jordan");
    return res.status(normalized.statusCode).json({
        message: normalized.message,
        data: normalized.data
    })
}