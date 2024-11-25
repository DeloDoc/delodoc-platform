import { useCallback, useEffect, useState } from 'react';

interface UseOfflineDetectorProps {
    pollingDelay?: number;
    remoteServerUrl?: string;

    setStatus?: ([global, remote]: [boolean, boolean]) => void;
}

export const useOfflineDetector = ({
    setStatus,
    pollingDelay = 5000,
    remoteServerUrl = '/',
}: UseOfflineDetectorProps) => {
    const [globalOnlineStatus, setGlobalOnlineStatus] = useState(navigator.onLine);
    const [remoteServerStatus, setRemoteServerStatus] = useState(true);

    let timeout: NodeJS.Timeout;

    const toggleStatus = useCallback(
        (global: boolean) => () => {
            setGlobalOnlineStatus(global);
            setStatus?.([global, remoteServerStatus]);
        },
        [remoteServerStatus, setStatus],
    );

    useEffect(() => {
        window.addEventListener('online', toggleStatus(true));
        window.addEventListener('offline', toggleStatus(false));

        if (!timeout) {
            setTimeout(() => {
                if (globalOnlineStatus !== navigator.onLine) {
                    setGlobalOnlineStatus(navigator.onLine);
                }

                fetch(remoteServerUrl, { method: 'HEAD' })
                    .then((res) => {
                        setRemoteServerStatus(res.status < 400);
                        setStatus?.([globalOnlineStatus, true]);
                    })
                    .catch(() => {
                        setRemoteServerStatus(false);
                        setStatus?.([globalOnlineStatus, false]);
                    });
            }, pollingDelay);
        }

        return () => {
            window.removeEventListener('online', toggleStatus(true));
            window.removeEventListener('offline', toggleStatus(false));

            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [globalOnlineStatus, remoteServerStatus];
};
