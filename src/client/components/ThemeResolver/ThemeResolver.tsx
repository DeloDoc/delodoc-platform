import React, { useContext, useEffect, useMemo } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';

import { PageContextProps, pageContext } from '../../context/page';

const Theme: React.FC<React.PropsWithChildren> = ({ children }) => {
    const currentPageContext = useContext(pageContext);
    const { resolvedTheme, setTheme } = useTheme();
    const syncTheme = (currentPageContext?.user?.theme || resolvedTheme || 'dark') as 'light' | 'dark';
    const context = useMemo<PageContextProps>(
        () => ({
            ...currentPageContext,
            theme: syncTheme,
        }),
        [currentPageContext, syncTheme],
    );

    useEffect(() => {
        // save css variables pass
        const currentHref = document?.getElementById?.('themeVariables')?.getAttribute('href')?.split('/');
        currentHref?.pop?.();
        currentHref?.push(`${syncTheme}.css`);
        const newHref = currentHref?.join('/');

        if (newHref) {
            document?.getElementById?.('themeVariables')?.setAttribute?.('href', newHref);
        }

        setTheme(syncTheme);
    }, [setTheme, syncTheme]);

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};

export const ThemeResolver: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ThemeProvider defaultTheme="dark">
        <Theme>{children}</Theme>
    </ThemeProvider>
);
