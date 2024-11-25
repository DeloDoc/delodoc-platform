import { z } from 'zod';
import slugify from 'slugify';

import { publicProcedure, router } from '../utils/trpc';

export const projectRouter = router({
    slug: publicProcedure.input(z.object({ project: z.string() })).query(({ input: { project } }) => ({
        slug: slugify(project),
    })),
});
