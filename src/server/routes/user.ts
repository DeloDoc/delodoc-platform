import { protectedProcedure, router } from '../utils/trpc';

export const userRouter = router({
    session: protectedProcedure.query(({ ctx: { req, user } }) => ({
        ...user,
        locale: req.locale.language,
    })),
});
