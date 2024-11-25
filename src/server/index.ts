import 'dotenv/config';
import type { ViteDevServer } from 'vite';
import express from 'express';

import { createApp } from './app';
import { html } from './utils/html';

const expressApp = express();
const mountPath = process.env.MOUNT_PATH || '';
const app = createApp({
    mountPath: process.env.NODE_ENV === 'production' ? mountPath : '',
});
const run = (port = process.env.PORT || 3000) => {
    expressApp.use(mountPath, app);

    expressApp.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`http://localhost:${port}/${mountPath}`);
    });
};

if (process.env.NODE_ENV === 'production') run();

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    require('vite')
        .createServer({
            server: {
                middlewareMode: true,
            },
            appType: 'custom',
        })
        .then((vite: ViteDevServer) => {
            expressApp.use(vite.middlewares);

            app.use('*', async (req, res) => {
                try {
                    const htmlString = await vite.transformIndexHtml(
                        req.url,
                        html({
                            themePlaceholder: 'dark',
                            localePlaceholder: req.locale.language,
                            path: './index.html',
                        }),
                    );

                    res.status(200)
                        // ! danger HMR support — dev mode only
                        .header('Content-Security-Policy', "script-src * 'unsafe-inline' 'unsafe-eval'")
                        .set({ 'Content-Type': 'text/html' })
                        .end(htmlString);
                } catch (error) {
                    res.status(500).end(error);
                }
            });

            run();
        });
}
