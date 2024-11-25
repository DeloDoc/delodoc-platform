import { createTRPCReact } from '@trpc/react-query';

import type { TrpcRouter } from '../../server/routes';

export const trpc = createTRPCReact<TrpcRouter>();
