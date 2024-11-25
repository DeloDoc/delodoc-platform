import { lazy, useContext } from 'react';

import { nullable } from '../../utils/nullable';
import { pageContext } from '../../context/page';
import { usePageLoading } from '../../hooks/usePageLoading';
import { useHotkeys } from '../../hooks/useHotkeys';

import s from './App.module.scss';

const LazyNotificationsStack = lazy(() => import('../NotificationsStack/NotificationsStack'));
const LazyNetworkStatusBar = lazy(() => import('../NetworkStatusBar/NetworkStatusBar'));
const LazyLoadingProgress = lazy(() => import('../LoadingProgress/LoadingProgress'));

export const App: React.FC<React.PropsWithChildren> = ({ children }) => {
    useHotkeys();

    const { globalNetworkStatus, remoteNetworkStatus } = useContext(pageContext);
    const pageLoadingRef = usePageLoading();

    return (
        <>
            <LazyLoadingProgress ref={pageLoadingRef} />

            {nullable(!globalNetworkStatus || !remoteNetworkStatus, () => (
                <LazyNetworkStatusBar global={!globalNetworkStatus} remote={!remoteNetworkStatus} />
            ))}

            <LazyNotificationsStack />

            <main className={s.App}>{children}</main>
        </>
    );
};
