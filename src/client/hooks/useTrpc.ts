import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

import { routes } from '../../server/contract/routes';
import { trpc } from '../utils/trpc';

import { useAuth } from './useAuth';
import { useRouter } from './useRouter';

// eslint-disable-next-line no-confusing-arrow
const authHeader = (token?: string) =>
    !token
        ? Object.create({})
        : {
              Authorization: `Bearer ${token}`,
          };

export const usePrivateTrpc = () => {
    const router = useRouter();
    const { token, refreshToken } = useAuth();
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: routes.api(),
                    headers: () => authHeader(token),
                    fetch: async (input, init?) => {
                        return fetch(input, {
                            ...init,
                            credentials: 'include',
                        }).then(async (res) => {
                            if (res.status === 401 && refreshToken) {
                                const refreshTokenRes = await fetch(routes.apiAuthRefresh(), {
                                    method: 'POST',
                                    // allow server cookies
                                    credentials: 'same-origin',
                                });

                                if (refreshTokenRes.status === 401 || refreshTokenRes.status === 500) {
                                    router.authSignin();

                                    return {
                                        json() {
                                            return Promise.resolve(undefined);
                                        },
                                    };
                                }

                                const newCreds = await refreshTokenRes.json();

                                return fetch(input, {
                                    ...init,
                                    headers: {
                                        ...init?.headers,
                                        ...authHeader(newCreds.result.data.token),
                                    },
                                });
                            }

                            return res;
                        });
                    },
                }),
            ],
        }),
    );

    return { queryClient, trpcClient };
};

export const usePublicTrpc = () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: routes.api(),
                }),
            ],
        }),
    );

    return { queryClient, trpcClient };
};
