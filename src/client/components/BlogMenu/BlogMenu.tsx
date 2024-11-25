import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    DocumentDuplicateIcon,
    DocumentTextIcon,
    TagIcon,
    EnvelopeIcon,
    Cog8ToothIcon,
} from '@heroicons/react/16/solid';

import { routes } from '../../../server/contract/routes';
import { nullable } from '../../utils/nullable';
import { Text } from '../Text/Text';
import { ColorLayer } from '../ColorLayer/ColorLayer';

import s from './BlogMenu.module.scss';

interface BlogMenuProps {
    className?: string;
}

interface BlogMenuItemProps {
    text: string;
    to: string;

    icon?: React.ReactNode;
}

const BlogMenuSection: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className={s.BlogMenuSection}>{children}</div>
);

const AppSideBarMenuItem: React.FC<BlogMenuItemProps> = ({ icon, text, to }) => (
    <NavLink to={to} className={({ isActive }) => cn([s.BlogMenuItem, { [s.BlogMenuItem_active]: isActive }])}>
        <span className={s.BlogMenuItemLinkContent}>
            {nullable(
                icon,
                () => (
                    <span className={s.BlogMenuItemIcon}>{icon}</span>
                ),
                <span className={s.BlogMenuItemTab} />,
            )}

            <Text size="s">{text}</Text>
        </span>
    </NavLink>
);

export const BlogMenu: React.FC<BlogMenuProps> = ({ className }) => {
    return (
        <ColorLayer className={className}>
            <div className={s.BlogMenuTitle}>TamGdeBlog</div>

            <BlogMenuSection>
                <AppSideBarMenuItem to={routes.index()} icon={<HomeIcon />} text="Dashboard" />
            </BlogMenuSection>

            <BlogMenuSection>
                <AppSideBarMenuItem to={routes.posts()} icon={<DocumentTextIcon />} text="Posts" />
                <AppSideBarMenuItem to="/posts/drafts" text="Drafts" />
                <AppSideBarMenuItem to="/posts/published" text="Published" />
                <AppSideBarMenuItem to="/posts/schedules" text="Scheduled" />
            </BlogMenuSection>

            <BlogMenuSection>
                <AppSideBarMenuItem to="/pages" icon={<DocumentDuplicateIcon />} text="Pages" />
                <AppSideBarMenuItem to={routes.tags()} icon={<TagIcon />} text="Tags" />
                <AppSideBarMenuItem to="/subscribers" icon={<EnvelopeIcon />} text="Subscribers" />
            </BlogMenuSection>

            <BlogMenuSection>
                <AppSideBarMenuItem to="/settings" icon={<Cog8ToothIcon />} text="Settings" />
            </BlogMenuSection>
        </ColorLayer>
    );
};
