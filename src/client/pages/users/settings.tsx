// import { useCallback } from 'react';

import { AppOutlet } from '../../components/AppOutlet/AppOutlet';
// import { useRouter } from '../../hooks/useRouter';
// import { Button } from '../../components/Button/Button';
import { Breadcrumbs, path } from '../../components/Breadcrumbs/Breadcrumbs';
import { UserSettingsMenu } from '../../components/UserSettingsMenu/UserSettingsMenu';

const Actions = () => {
    return null;
};

export default () => {
    return (
        <AppOutlet
            title="Appearance"
            actions={<Actions />}
            nav={<Breadcrumbs path={[path.index(), path.userSettings()]} />}
            sidebar={<UserSettingsMenu />}
        ></AppOutlet>
    );
};
