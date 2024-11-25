import cn from 'classnames';

import { UserPic } from '../UserPic/UserPic';
import { Button } from '../Button/Button';

import s from './UserBadge.module.scss';

interface UserBadgeProps {
    email: string;

    image?: string;
    name?: string;
    className?: string;
    iconRight?: React.ReactNode;
}

export const UserBadge: React.FC<UserBadgeProps> = ({ email, image, name, className, iconRight }) => {
    const viewName = name || email.split('@')[0];

    return (
        <Button
            view="ghost"
            text={viewName}
            iconLeft={<UserPic src={image || undefined} email={email} name={name || undefined} />}
            iconRight={iconRight}
            className={cn(s.UserBadge, className)}
        />
    );
};
