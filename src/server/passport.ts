import type { Request, Response, Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import * as queries from './database/queries';
import { UserSession } from './database/queries/user';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const configurePassport = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());

    passport.use(
        'signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) =>
            queries.user
                .findByCreds({ email, password })
                .then(async (user) => done(undefined, user))
                .catch(() =>
                    // log real error
                    done(undefined, false, {
                        message: 'Invalid email or password',
                    }),
                ),
        ),
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                secretOrKey: process.env.JWT_SECRET!,
            },
            (jwtPayload, cb) =>
                queries.user
                    .findByIdOrThrow({ id: jwtPayload.id })
                    .then((user) => cb(null, user))
                    .catch((err) => cb(err)),
        ),
    );
};

export const authenticate = (strategy: 'signin' | 'jwt', req: Request, res: Response) =>
    new Promise<UserSession>((resolve, reject) => {
        passport.authenticate(
            strategy,
            { session: false },
            (err: unknown, user: UserSession, info?: { message: string }) => {
                if (err) reject(err);

                if (info?.message) reject(info.message);

                resolve(user);
            },
        )(req, res);
    });
