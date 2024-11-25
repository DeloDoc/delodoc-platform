import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { schema } from './pages/_routes/schema';
import { Root } from './components/Root/Root';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <Root>
            <RouterProvider router={schema} />
        </Root>
    </React.StrictMode>,
);
