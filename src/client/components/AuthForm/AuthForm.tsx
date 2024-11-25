import cn from 'classnames';

import { Logo } from '../Logo/Logo';
import { Text } from '../Text/Text';

import s from './AuthForm.module.scss';

interface AuthFormProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];

    className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, description, children, onSubmit, className }) => {
    return (
        <div className={cn(s.AuthForm, className)}>
            <div className={cn(s.AuthFormContent)}>
                <Logo />

                <Text className={s.AuthFormTitle} size="xl">
                    {title}
                </Text>

                <Text className={s.AuthFormDescription}>{description}</Text>

                <form className={s.AuthFormForm} onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};
