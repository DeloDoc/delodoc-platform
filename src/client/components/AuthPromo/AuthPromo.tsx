import cn from 'classnames';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';

import { nullable } from '../../utils/nullable';
import { Text } from '../Text/Text';
import { Link } from '../Link/Link';

import s from './AuthPromo.module.scss';

interface AuthPromoListProps {
    children: React.ReactNode;

    className?: string;
}

export const AuthPromoList: React.FC<AuthPromoListProps> = ({ children, className }) => {
    return <div className={cn(s.AuthPromoList, className)}>{children}</div>;
};

interface AuthPromoListItemProps {
    text: React.ReactNode;
    to: string;

    icon?: React.ReactNode;
    className?: string;
}

export const AuthPromoListItem: React.FC<AuthPromoListItemProps> = ({ text, to, icon, className }) => {
    return (
        <Link className={cn(s.AuthPromoListItemLink, className)} view="primary" to={to}>
            <span className={s.AuthPromoListItemLinkContent}>
                {nullable(icon, () => (
                    <span className={s.AuthPromoListItemIcon}>{icon}</span>
                ))}

                <span>{text}</span>
            </span>

            <ArrowLongRightIcon className={s.AuthPromoListItemArrowIcon} />
        </Link>
    );
};

interface AuthPromoProps {
    children: React.ReactNode;
    title: string;
    description: string;

    className?: string;
}

export const AuthPromo: React.FC<AuthPromoProps> = ({ children, title, description, className }) => {
    return (
        <div className={cn(s.AuthPromo, className)}>
            <div className={s.AuthPromoContent}>
                <h1 className={s.AuthPromoTitle}>{title}</h1>
                <Text as="p" size="l" className={s.AuthPromoDescription}>
                    {description}
                </Text>

                {children}
            </div>
        </div>
    );
};
