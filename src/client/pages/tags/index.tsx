import { useCallback } from 'react';

import { AppOutlet } from '../../components/AppOutlet/AppOutlet';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../../components/Button/Button';
import { Breadcrumbs, path } from '../../components/Breadcrumbs/Breadcrumbs';

const TagsActions = () => {
    const router = useRouter();
    const { signout } = useAuth();

    const handleSignout = useCallback(() => {
        signout();
        router.authSignin();
    }, [signout, router]);

    return <Button onClick={handleSignout} text="Signout" />;
};

export default () => {
    return (
        <AppOutlet title="Tags" actions={<TagsActions />} nav={<Breadcrumbs path={[path.index(), path.tags()]} />}>
            {/* <Link to={'2'}>Go to 2</Link> */}
            {/* <Button view="primary" onClick={() => createNotification.success('Hi darling!')} text="Toast" /> */}
        </AppOutlet>
    );
};
