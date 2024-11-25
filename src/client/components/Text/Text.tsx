import { forwardRef, useMemo } from 'react';
import cn from 'classnames';

import s from './Text.module.scss';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    weight?: 'bolder' | 'bold' | 'regular' | 'thin' | 'thiner';
    color?: string;
    ellipsis?: boolean;
    strike?: boolean;
    lines?: number;
    wordWrap?: React.CSSProperties['wordWrap'];
    wordBreak?: React.CSSProperties['wordBreak'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any>;
    children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = forwardRef(
    (
        {
            color = 'inherit',
            size = 'm',
            weight,
            ellipsis,
            lines,
            strike,
            wordBreak,
            wordWrap,
            as: Tag = 'div',
            className,
            children,
        },
        ref,
    ) => {
        const classes = cn([
            s.Text,
            { [s.Text_strike]: strike, [s.Text_ellipsis]: ellipsis, [s.Text_lines]: lines },
            className,
        ]);

        const variables = useMemo(() => {
            const vars: Record<string, string | number> = {};

            if (color) vars['--text-color'] = color;
            if (size) vars['--text-size'] = `var(--font-size-${size})`;
            if (weight) vars['--text-weight'] = `var(--font-weight-${weight})`;
            if (wordBreak) vars.wordBreak = wordBreak;
            if (wordWrap) vars.wordWrap = wordWrap;
            if (lines) vars['--text-lines'] = lines;

            return vars;
        }, [color, size, weight, wordBreak, wordWrap, lines]);

        return (
            <Tag className={classes} style={variables} ref={ref}>
                {children}
            </Tag>
        );
    },
);
