import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { Router } from 'express';
import morgan from 'morgan';
import createLocaleMiddleware from 'express-locale';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { trpcRouter } from './routes';
import { createContext } from './utils/trpcContext';
import { configurePassport } from './passport';
import { html } from './utils/html';
import { cookies } from './contract/cookies';
import { daysToMs } from './utils/date';
import * as queries from './database/queries';
import { routes } from './contract/routes';

interface AppProps {
    mountPath?: string;
}

export const createApp = ({ mountPath }: AppProps) => {
    const router = Router();

    router.use(
        cookieSession({
            name: 'session',
            keys: ['openreplay'],
            maxAge: daysToMs(1),
        }),
    );

    configurePassport(router);

    router.use(
        cors({
            credentials: true,
        }),
    );
    router.use(compression());
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cookieParser());
    router.use(createLocaleMiddleware());
    router.use(morgan('dev'));
    router.use(
        '/api',
        createExpressMiddleware({
            router: trpcRouter,
            createContext,
        }),
    );

    router.use('/health', (_req, res) => {
        res.status(200).end('Ok');
    });

    if (process.env.NODE_ENV === 'production') {
        router.use(
            express.static(path.resolve(process.cwd(), 'dist/client'), {
                index: false,
            }),
        );
        router.use('*', async (req, res) => {
            try {
                res.status(200)
                    .set({ 'Content-Type': 'text/html' })
                    .end(
                        html({
                            // @ts-ignore express do not satisfy resolved user
                            themePlaceholder: req.user?.theme || 'dark',
                            localePlaceholder: req.locale.language,
                            mountPathPlaceholder: mountPath,
                            path: './dist/client/index.html',
                        }),
                    );
            } catch (error) {
                res.status(500).end(error);
            }
        });
    }

    router.use([routes.authSignin(''), routes.authSignup(''), routes.authBootstrap('')], async (req, res, next) => {
        const count = await queries.user.count();

        if (count === 0) {
            res.cookie(cookies.firstVisit, true, {
                maxAge: daysToMs(1),
            });

            if (!req.baseUrl.endsWith(routes.authBootstrap())) {
                res.redirect(routes.authBootstrap());
            } else {
                next();
            }
        } else {
            next();
        }
    });

    return router;
};
