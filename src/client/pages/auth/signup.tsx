import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { DocumentTextIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { trpc } from '../../utils/trpc';
import type { SignupSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';
import { useRouter } from '../../hooks/useRouter';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthPage } from '../../components/AuthPage/AuthPage';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { FormField, FormFieldInput, FormFieldLabel } from '../../components/FormField/FormField';
import { FormActions } from '../../components/FormActions/FormActions';
import { FormTip } from '../../components/FormTip/FormTip';
import { Link } from '../../components/Link/Link';
import { AuthPromo, AuthPromoList, AuthPromoListItem } from '../../components/AuthPromo/AuthPromo';
import { routes } from '../../../server/contract/routes';

export default () => {
    const router = useRouter();
    const { resolvedTheme: theme } = useTheme();

    const { register, handleSubmit } = useForm<SignupSchema>({
        email: '',
        password: '',
        theme,
    });

    const signupMutation = trpc.auth.signup.useMutation();

    const onSubmit = useCallback(
        async (data: SignupSchema) => {
            await signupMutation.mutateAsync(data as SignupSchema);

            if (!signupMutation.error) {
                router.index();
            }
        },
        [signupMutation, router],
    );

    return (
        <AuthPage>
            <div>
                <AuthPromo
                    title="Ready to join?"
                    description="Connect with your team in one step. Complete your credentials and start collaborate."
                >
                    <AuthPromoList>
                        <AuthPromoListItem to={routes.docs()} icon={<DocumentTextIcon />} text="Read the docs" />
                        <AuthPromoListItem to={routes.releases()} icon={<TagIcon />} text="Checkout latest releases" />
                        <AuthPromoListItem
                            to={routes.slack()}
                            icon={<UserGroupIcon />}
                            text="Join our Slack Community"
                        />
                    </AuthPromoList>
                </AuthPromo>
            </div>

            <div>
                <AuthForm title="Sign up" description="Please enter your details" onSubmit={handleSubmit(onSubmit)}>
                    {nullable(signupMutation.error, (err) => (
                        <div>{JSON.stringify(humanError(err), null, 2)}</div>
                    ))}

                    <FormField {...register('email')}>
                        <FormFieldLabel>Email</FormFieldLabel>
                        <FormFieldInput>
                            <Input type="email" autoComplete="on" autoFocus />
                        </FormFieldInput>
                    </FormField>

                    <FormField {...register('password')}>
                        <FormFieldLabel>Password</FormFieldLabel>
                        <FormFieldInput>
                            <Input type="password" />
                        </FormFieldInput>
                    </FormField>

                    <FormActions>
                        <Button stretched view="primary" type="submit" text="Start blogging" />
                    </FormActions>

                    <FormTip>
                        Already have an account?{' '}
                        <Link color="var(--text-primary)" view="inline" to={routes.authSignin()}>
                            Sign in
                        </Link>
                        .
                    </FormTip>
                </AuthForm>
            </div>
        </AuthPage>
    );
};
