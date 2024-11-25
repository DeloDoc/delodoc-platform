import cn from 'classnames';

import s from './ColorLayer.module.scss';

interface ColorLayerProps {
    children: React.ReactNode;

    className?: string;
}

export const ColorLayer: React.FC<ColorLayerProps> = ({ children, className }) => {
    return <div className={cn(s.ColorLayer, className)}>{children}</div>;
};
