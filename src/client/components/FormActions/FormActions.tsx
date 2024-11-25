import cn from 'classnames';

import s from './FormActions.module.scss';

interface FormActionsProps {
    children: React.ReactNode;

    className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ className, children }) => {
    return <div className={cn(s.FormActions, className)}>{children}</div>;
};
