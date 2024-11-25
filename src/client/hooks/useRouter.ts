import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../server/contract/routes';

interface BuildRoutesMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [route: string]: (...args: any) => string;
}

type BuildRouterResult<T extends BuildRoutesMap> = {
    [key in keyof T]: (...args: Parameters<T[key]>) => void;
};

function buildRouter<T extends BuildRoutesMap, K extends keyof T, BuildFn extends T[K]>(
    source: T,
    cb: (path: string) => void,
): BuildRouterResult<T> {
    return (Object.entries(source) as [keyof T, BuildFn][]).reduce((acc, [key, fn]) => {
        // eslint-disable-next-line prefer-spread
        acc[key] = (...args: Parameters<T[K]>) => cb(fn.apply(null, args));

        return acc;
    }, {} as BuildRouterResult<T>);
}

export const useRouter = () => {
    const navigate = useNavigate();

    const router = useMemo(() => buildRouter(routes, navigate), [navigate]);

    return router;
};
