import React, { FC, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import md5Hash from 'md5';

import { LoadState } from '../../types/common';
import { isRetina } from '../../utils/isRetina';
import { preloadImage } from '../../utils/preloadImage';
import { initials } from '../../utils/initials';
import { GradientCircle } from '../GradientCircle/GradientCircle';

import s from './Gravatar.module.scss';

interface GravatarProps extends React.HTMLAttributes<HTMLImageElement> {
    email?: string | null;
    md5?: string;
    size?: number;
    rating?: string;
    def?: string;
    className?: string;
    domain?: string;
    name?: string | null;

    onClick?: () => void;
}

export const Gravatar: FC<GravatarProps> = ({
    size = 24,
    rating = 'g',
    def = 'retro',
    domain = 'www.gravatar.com',
    email,
    md5,
    name,
    className,
    ...props
}) => {
    const [status, setStatus] = useState<LoadState>(md5 || email ? LoadState.loading : LoadState.error);

    const src = useMemo(() => {
        const query = new URLSearchParams({
            s: String(size),
            r: rating,
            d: def,
        });

        const retinaQuery = new URLSearchParams({
            s: String(size * 2),
            r: rating,
            d: def,
        });

        let hash;

        if (md5) {
            hash = md5;
        } else if (email) {
            hash = md5Hash(email?.trim().toLowerCase() || '', { encoding: 'binary' });
        } else return null;

        const base = `//${domain}/avatar/`;
        const src = `${base}${hash}?${query}`;
        const retinaSrc = `${base}${hash}?${retinaQuery}`;

        return isRetina() ? retinaSrc : src;
    }, [def, domain, email, md5, rating, size]);

    const cnProvider = (str: string) => cn(s.Gravatar, str, className);
    const fallback = (
        <GradientCircle size={size} source={`${email}`} className={cnProvider(`${s.Gravatar}${status}`)} {...props}>
            {initials(name)}
        </GradientCircle>
    );

    useEffect(() => {
        if (LoadState.loading && src) {
            preloadImage(src)
                .then(() => setStatus(LoadState.success))
                .catch(() => setStatus(LoadState.error));
        }
    }, [src]);

    if (!src) return fallback;

    return status === LoadState.loading ? (
        fallback
    ) : (
        <img className={cnProvider(`${s.Gravatar}${status}`)} src={src} height={size} width={size} {...props} />
    );
};
