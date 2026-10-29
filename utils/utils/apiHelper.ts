import { APIRequestContext, request } from '@playwright/test';

export class APIHelper {

    static async createRequest(): Promise<APIRequestContext> {

        return await request.newContext({
            baseURL: process.env.API_URL
        });
    }
}