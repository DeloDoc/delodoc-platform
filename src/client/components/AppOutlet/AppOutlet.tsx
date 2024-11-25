import cn from 'classnames';

import { AppSideBarOutlet } from '../AppSideBarOutlet/AppSideBarOutlet';
import { BlogMenu } from '../BlogMenu/BlogMenu';

import s from './AppOutlet.module.scss';

interface AppOutletProps {
    title: React.ReactNode;

    sidebar?: React.ReactNode;
    children?: React.ReactNode;
    nav?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export const AppOutlet: React.FC<AppOutletProps> = ({
    title,
    sidebar = <BlogMenu />,
    children,
    nav,
    actions,
    className,
}) => {
    return (
        <>
            <AppSideBarOutlet>{sidebar}</AppSideBarOutlet>

            <div className={cn(s.AppOutlet, className)}>
                <div className={cn(s.AppOutletHeader)}>
                    <div>{nav}</div>
                    <div>{actions}</div>
                </div>

                <div>
                    <h2>{title}</h2>

                    {children}
                </div>
            </div>
        </>
    );
};
