import React, { useMemo } from 'react';
import cn from 'classnames';

import { isColorDark, stringToColor } from '../../utils/stringToColor';

import s from './GradientCircle.module.scss';

interface GradientCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
    source: string;

    size?: number;
    className?: string;
}

export const GradientCircle: React.FC<React.PropsWithChildren<GradientCircleProps>> = ({
    children,
    source,
    size,
    className,
    ...attrs
}) => {
    const { style, isDark } = useMemo(() => {
        const mainColor = stringToColor(source);
        const style = {
            '--circle-main-color': mainColor,
            '--circle-secondary-color': stringToColor(source.toUpperCase()),
            '--circle-size': size ? `${size}px` : undefined,
        } as React.CSSProperties;

        return {
            style,
            isDark: isColorDark(mainColor),
        };
    }, [source, size]);

    return (
        <div
            className={cn(s.GradientCircle, className, {
                [s.GradientCircleLighten]: !isDark,
                [s.GradientCircleDarken]: isDark,
                [s.GradientCircleSize]: size,
            })}
            {...attrs}
            style={style}
        >
            {children}
        </div>
    );
};
