import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { LoadingProgressRef } from '../components/LoadingProgress/LoadingProgress';

export const usePageLoading = () => {
    const pageLoadingRef = useRef<LoadingProgressRef>(null);
    const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPrevLoc(location.pathname);
        setProgress(true);

        if (location.pathname === prevLoc) {
            setPrevLoc('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        setProgress(false);
    }, [prevLoc]);

    useEffect(() => {
        if (progress) {
            pageLoadingRef.current?.start();
        } else {
            pageLoadingRef.current?.done();
        }
    }, [progress]);

    return pageLoadingRef;
};
