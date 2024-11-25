import { useContext } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { pageContext } from '../../context/page';
import { UserBadge } from '../UserBadge/UserBadge';
import { Dropdown, DropdownArrow, DropdownPanel, DropdownTrigger } from '../Dropdown/Dropdown';

import s from './AppSideBarOutlet.module.scss';

interface AppSideBarOutletProps {
    children?: React.ReactNode;
    className?: string;
}

export const AppSideBarOutlet: React.FC<AppSideBarOutletProps> = ({ children, className }) => {
    const { user } = useContext(pageContext);

    return (
        <div className={cn(s.AppSideBarOutlet, className)}>
            {children}

            {nullable(user?.email, (email) => (
                <Dropdown>
                    <DropdownTrigger>
                        <UserBadge
                            image={user?.image || undefined}
                            email={email}
                            name={user?.name || undefined}
                            iconRight={<DropdownArrow />}
                        />
                    </DropdownTrigger>
                    <DropdownPanel>Hola</DropdownPanel>
                </Dropdown>
            ))}
        </div>
    );
};
