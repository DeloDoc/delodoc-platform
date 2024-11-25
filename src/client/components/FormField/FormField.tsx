import cn from 'classnames';
import { useContext } from 'react';

import type { FormFieldContextProps } from '../../context/formField';
import { formFieldContext } from '../../context/formField';
import { Text } from '../Text/Text';

import s from './FormField.module.scss';

interface FormFieldProps extends FormFieldContextProps {
    children: React.ReactNode;

    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ className, children, ...contextProps }) => {
    return (
        <div className={cn(s.FormField, className)}>
            <formFieldContext.Provider value={contextProps}>{children}</formFieldContext.Provider>
        </div>
    );
};

interface FormFieldLabelProps {
    children: React.ReactNode;

    htmlFor?: string;
    className?: string;
}

export const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ children, htmlFor, className }) => {
    const formFieldCtx = useContext(formFieldContext);

    return (
        <div className={cn(s.FormFieldLabel, className)}>
            <label htmlFor={htmlFor || formFieldCtx?.id}>
                <Text size="s">{children}</Text>
            </label>
        </div>
    );
};

export const FormFieldInput: React.FC<FormFieldProps> = ({ className, children }) => {
    return <div className={cn(s.FormFieldInput, className)}>{children}</div>;
};

export const FormFieldDescription: React.FC<FormFieldProps> = ({ className, children }) => {
    return (
        <Text size="s" className={cn(s.FormFieldDescription, className)}>
            {children}
        </Text>
    );
};
