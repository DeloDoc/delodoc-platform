import { useCallback, useMemo } from 'react';

import { cookies } from '../../server/contract/cookies';

import { useCookie } from './useCookie';

export const useAuth = () => {
    const {
        value: authTokenCookie,
        updateCookie: updateToken,
        deleteCookie: deleteToken,
    } = useCookie(cookies.authToken, 1000);
    const {
        value: refreshTokenCookie,
        updateCookie: updateRefreshToken,
        deleteCookie: deleteRefreshToken,
    } = useCookie(cookies.refreshToken);
    const updateTokens = useCallback(
        (token: string, refreshToken: string) => {
            updateToken(token);
            updateRefreshToken(refreshToken);
        },
        [updateToken, updateRefreshToken],
    );
    const userId = useMemo(() => {
        if (authTokenCookie) {
            const base64Url = authTokenCookie.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                    .join(''),
            );

            const payload: { id: string } = JSON.parse(jsonPayload);

            return payload.id;
        }

        return undefined;
    }, [authTokenCookie]);

    const signout = useCallback(() => {
        deleteToken();
        deleteRefreshToken();
    }, [deleteToken, deleteRefreshToken]);

    return {
        token: authTokenCookie,
        refreshToken: refreshTokenCookie,
        authorized: Boolean(authTokenCookie),
        id: userId,
        updateTokens,
        signout,
    };
};
