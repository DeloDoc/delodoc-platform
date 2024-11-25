module.exports.template = (_, fileName) =>
    `import cn from 'classnames';

import s from './${fileName}.module.scss';

interface ${fileName}Props {
    children: React.ReactNode;

    className?: string;
}

export const ${fileName}: React.FC<${fileName}Props> = ({ children, className }) => {
    return <div className={cn(s.${fileName}, className)}>{children}</div>;
};`;
