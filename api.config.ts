import {PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: '/tests/api',
    use: {
        headless: true,
        viewport: {width: 1920, height: 1080},
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
            name: 'chromium',
            use: {channel: 'chrome'},
        },
        {
            name: 'firefox',
            use: {channel: 'firefox'},
        },
        {
            name: 'webkit',
            use: {channel: 'webkit'},
        },
    ],
}
export default config;