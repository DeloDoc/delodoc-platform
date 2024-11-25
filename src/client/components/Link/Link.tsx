import React, { AnchorHTMLAttributes, forwardRef, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';

import s from './Link.module.scss';

const viewMap = {
    primary: s.Link_primary,
    secondary: s.Link_secondary,
    inline: s.Link_inline,
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    view?: keyof typeof viewMap;
    to?: string;
    color?: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, view = 'primary', to, color, ...rest }, ref) => {
        const classes = [s.Link, viewMap[view], className];

        const style = useMemo(
            () =>
                ({
                    '--link-color': color,
                }) as React.CSSProperties,
            [color],
        );

        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (e.metaKey || e.ctrlKey || !rest.onClick) return;

            e.preventDefault();
            rest.onClick(e);
        };

        const linkProps: LinkProps & React.RefAttributes<HTMLAnchorElement> = {
            className: cn(classes),
            ref,
            style,
            onClick,
            ...rest,
        };

        return nullable(to, (t) => <RouterLink to={t} {...linkProps} />, <a {...linkProps} />);
    },
);
