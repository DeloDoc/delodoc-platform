import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { cookies } from '../../server/contract/cookies';

export const useCookie = (cookieName: cookies, interval?: number) => {
    const [value, setValue] = useState<string | undefined>(() => Cookies.get(cookieName));

    useEffect(() => {
        let id: NodeJS.Timeout | undefined;

        if (interval) {
            id = setInterval(() => {
                setValue(() => Cookies.get(cookieName));
            }, interval);
        }

        return () => {
            clearInterval(id);
        };
    }, [cookieName, interval]);

    const updateCookie = useCallback(
        (newValue: string, options?: Cookies.CookieAttributes) => {
            Cookies.set(cookieName, newValue, options);
            setValue(newValue);
        },
        [cookieName],
    );

    const deleteCookie = useCallback(() => {
        Cookies.remove(cookieName);
        setValue(undefined);
    }, [cookieName]);

    return { value, updateCookie, deleteCookie };
};
