// import { useCallback } from 'react';

import { AppOutlet } from '../../components/AppOutlet/AppOutlet';
// import { useRouter } from '../../hooks/useRouter';
// import { Button } from '../../components/Button/Button';
import { Breadcrumbs, path } from '../../components/Breadcrumbs/Breadcrumbs';

const PostsActions = () => {
    // const router = useRouter();

    // const handleSignout = useCallback(() => {
    //     router.authSignin();
    // }, [signout, router]);

    // return <Button onClick={handleSignout} text="Signout" />;

    return null;
};

export default () => {
    return (
        <AppOutlet
            title="Posts"
            actions={<PostsActions />}
            nav={<Breadcrumbs path={[path.index(), path.posts()]} />}
        ></AppOutlet>
    );
};
