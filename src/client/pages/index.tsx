// import { Outlet } from 'react-router-dom';

import { AppOutlet } from '../components/AppOutlet/AppOutlet';
import { Breadcrumbs, path } from '../components/Breadcrumbs/Breadcrumbs';

export default () => <AppOutlet title="Dashboard" nav={<Breadcrumbs path={[path.index()]} />}></AppOutlet>;
