import { inferRouterOutputs } from '@trpc/server';

import { TrpcRouter } from '../../routes';

export type RouterOutputs = inferRouterOutputs<TrpcRouter>;
