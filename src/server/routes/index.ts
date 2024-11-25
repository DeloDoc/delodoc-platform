import { router } from '../utils/trpc';

import { authRouter } from './auth';
import { userRouter } from './user';
import { projectRouter } from './project';

export const trpcRouter = router({
    auth: authRouter,
    user: userRouter,
    project: projectRouter,
});

export type TrpcRouter = typeof trpcRouter;
