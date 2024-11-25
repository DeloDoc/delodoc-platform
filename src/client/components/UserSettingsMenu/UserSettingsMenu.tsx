import { ColorLayer } from '../ColorLayer/ColorLayer';

import s from './UserSettingsMenu.module.scss';

interface UserSettingsMenuProps {
    children?: React.ReactNode;
    className?: string;
}

export const UserSettingsMenu: React.FC<UserSettingsMenuProps> = ({ children, className }) => {
    return (
        <ColorLayer className={className}>
            <div className={s.UserSettingsMenuTitle}>Settings</div>

            {children}
        </ColorLayer>
    );
};
