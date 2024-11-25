import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
    req,
    res,
    locale: req.locale,
});

export type Context = inferAsyncReturnType<typeof createContext>;
