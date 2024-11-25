import { useContext } from 'react';
import { Toaster } from 'sonner';

import { pageContext } from '../../context/page';

export interface ToastProps extends React.ComponentProps<typeof Toaster> {}

// @see https://sonner.emilkowal.ski/styling
export default (props: ToastProps) => {
    const { theme } = useContext(pageContext);

    return <Toaster {...props} theme={theme} />;
};
