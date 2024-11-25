import { firstSignupSchema, signinSchema, signupSchema } from '../contract/schema/auth';
import { publicProcedure, router } from '../utils/trpc';
import * as queries from '../database/queries';
import { setTokensCookies, signTokens, verifyToken } from '../utils/encrypt';
import { handleProcedure } from '../utils/handleProcedure';
import { authenticate } from '../passport';
import { cookies } from '../contract/cookies';

export const authRouter = router({
    signup: publicProcedure.input(signupSchema).mutation(async ({ input: { email, password, theme }, ctx: { res } }) =>
        handleProcedure(async () => {
            const user = await queries.user.create(
                {
                    email,
                    password,
                },
                {
                    theme,
                },
            );

            const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

            setTokensCookies(res, {
                token,
                tokenExpDays,
                refreshToken,
                refreshTokenExpDays,
            });
        })('FORBIDDEN'),
    ),
    firstSignup: publicProcedure
        .input(firstSignupSchema)
        .mutation(async ({ input: { email, password, theme, project }, ctx: { res } }) =>
            handleProcedure(async () => {
                const user = await queries.user.createFirstAdmin(
                    {
                        email,
                        password,
                    },
                    {
                        theme,
                    },
                    {
                        title: project,
                    },
                );

                const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

                setTokensCookies(res, {
                    token,
                    tokenExpDays,
                    refreshToken,
                    refreshTokenExpDays,
                });
            })('FORBIDDEN'),
        ),
    signin: publicProcedure.input(signinSchema).mutation(async ({ input: { email, password }, ctx: { req, res } }) =>
        handleProcedure(async () => {
            // trpc batch data with array
            // originally { '0': { email, password } }
            req.body = { email, password };

            const user = await authenticate('signin', req, res);

            const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

            setTokensCookies(res, {
                token,
                tokenExpDays,
                refreshToken,
                refreshTokenExpDays,
            });

            return { days: tokenExpDays, token, refreshToken };
        })('FORBIDDEN'),
    ),
    refresh: publicProcedure.mutation(async ({ ctx: { req, res } }) =>
        handleProcedure(async () => {
            const decoded = verifyToken(req.cookies[cookies.refreshToken]);

            // FIXME: move into verifyToken
            if (typeof decoded === 'string' || !decoded.id) return;

            const user = await queries.user.findByIdOrThrow({ id: decoded.id });

            const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

            setTokensCookies(res, {
                token,
                tokenExpDays,
                refreshToken,
                refreshTokenExpDays,
            });

            return { token, refreshToken };
        })('UNAUTHORIZED'),
    ),
});
