import cn from 'classnames';

import { routes } from '../../../server/contract/routes';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';

import s from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
    path: React.ReactNode[];

    className?: string;
}

const BreadcrumbSep = () => <span className={s.BreadcrumbsItemsSep}>/</span>;

const declCrumb = (text: string, to: React.ComponentProps<typeof Link>['to']) => () => (
    <Text size="xs" as="span" key={text + to}>
        <Link to={to} className={cn(s.BreadcrumbsItem)}>
            {text}
        </Link>

        <BreadcrumbSep />
    </Text>
);

export const path = {
    index: declCrumb('~', routes.index()),
    tags: declCrumb('tags', routes.tags()),
    posts: declCrumb('posts', routes.posts()),
    userSettings: declCrumb('settings', routes.userSettings()),
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, className }) => {
    return <div className={cn(s.Breadcrumbs, className)}>{path}</div>;
};
