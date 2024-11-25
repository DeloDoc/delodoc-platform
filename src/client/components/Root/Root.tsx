import { PageContext } from '../../context/page';

import './Root.css';
import '../Typo/Typo.module.scss';

export const Root: React.FC<React.PropsWithChildren> = ({ children }) => <PageContext>{children}</PageContext>;
