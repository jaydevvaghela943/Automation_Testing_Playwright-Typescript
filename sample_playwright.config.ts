import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 2,
    fullyParallel: true,
    workers: 4,
    use: {
        baseURL: process.env.BASE_URL,
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    reporter: [
        ['html'],
        ['allure-playwright']
    ],
    projects: [
        {
            name: 'Chrome',
            use: { browserName: 'chromium' }
        },

        // {
        //     name: 'Firefox',
        //     use: { browserName: 'firefox' }
        // },

        // {
        //     name: 'Webkit',
        //     use: { browserName: 'webkit' }
        // }
    ],
    
});