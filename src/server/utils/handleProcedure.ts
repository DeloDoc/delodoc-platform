import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

export function handleProcedure<T>(body: () => T) {
    // @ts-ignore
    return async function procedureHandler(code: TRPC_ERROR_CODE_KEY): T {
        try {
            const result = await body();

            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // TODO: logger
            throw new TRPCError({
                code,
                message: error.message,
                cause: error,
            });
        }
    };
}
