import cn from 'classnames';

import s from './AuthPage.module.scss';

interface AuthPageProps {
    children: React.ReactNode;

    className?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({ className, children }) => {
    return <div className={cn(s.AuthPage, className)}>{children}</div>;
};
