import React, { Suspense, useContext, useEffect, useMemo } from 'react';

import { trpc } from '../../utils/trpc';
import { App } from '../../components/App/App';
import { useAuth } from '../../hooks/useAuth';
import { nullable } from '../../utils/nullable';
import type { PageContextProps } from '../../context/page';
import { pageContext } from '../../context/page';
import { PrivateTrpc, PublicTrpc } from '../../components/Trpc/Trpc';
import { useRouter } from '../../hooks/useRouter';
import { ThemeResolver } from '../../components/ThemeResolver/ThemeResolver';

const ProtectedOverrides: React.FC<React.PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const currentPageContext = useContext(pageContext);
    const { authorized, token, refreshToken, updateTokens } = useAuth();
    const authRefreshMutation = trpc.auth.refresh.useMutation();
    const { data: user } = trpc.user.session.useQuery(undefined, {
        enabled: authorized,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });
    const context = useMemo<PageContextProps>(
        () => ({
            ...currentPageContext,
            authorized: authRefreshMutation.isLoading ? true : authorized,
            user,
        }),
        [user, currentPageContext, authRefreshMutation.isLoading, authorized],
    );

    useEffect(() => {
        if (!authorized && !refreshToken) {
            router.authSignin();
        }
    }, [authorized, refreshToken, router]);

    useEffect(() => {
        if (refreshToken && !token && !authRefreshMutation.isLoading) {
            (async () => {
                const data = await authRefreshMutation.mutateAsync(undefined);

                if (data) {
                    updateTokens(data.token, data.refreshToken);
                } else {
                    router.authSignin();
                }
            })();
        }
    }, [authRefreshMutation, refreshToken, router, token, updateTokens]);

    return nullable(authorized, () => <pageContext.Provider value={context}>{children}</pageContext.Provider>);
};

export const Protected: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PrivateTrpc>
        <ProtectedOverrides>
            <ThemeResolver>
                <App>{children}</App>
            </ThemeResolver>
        </ProtectedOverrides>
    </PrivateTrpc>
);

export const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PublicTrpc>
        <ThemeResolver>{children}</ThemeResolver>
    </PublicTrpc>
);

const createElementWrapper = (Wrapper: React.FC<React.PropsWithChildren>) => (children: React.ReactNode) => (
    <Wrapper>
        <Suspense fallback="Loading...">{children}</Suspense>
    </Wrapper>
);

export const publicElement = createElementWrapper(PublicRoute);
export const protectedElement = createElementWrapper(Protected);
