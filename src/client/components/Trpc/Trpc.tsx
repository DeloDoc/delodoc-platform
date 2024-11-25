import { QueryClientProvider } from '@tanstack/react-query';

import { usePrivateTrpc, usePublicTrpc } from '../../hooks/useTrpc';
import { trpc } from '../../utils/trpc';

export const PrivateTrpc: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { queryClient, trpcClient } = usePrivateTrpc();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};

export const PublicTrpc: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { queryClient, trpcClient } = usePublicTrpc();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
