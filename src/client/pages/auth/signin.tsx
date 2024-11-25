import { useCallback } from 'react';
import { DocumentTextIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { trpc } from '../../utils/trpc';
import type { SigninSchema } from '../../../server/contract/schema/auth';
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
    const { register, handleSubmit } = useForm<SigninSchema>({
        email: '',
        password: '',
    });

    const signinMutation = trpc.auth.signin.useMutation();

    const onSubmit = useCallback(
        async (data: SigninSchema) => {
            const credentials = await signinMutation.mutateAsync(data);

            if (credentials.token) router.index();
        },
        [signinMutation, router],
    );

    return (
        <AuthPage>
            <div>
                <AuthPromo
                    title="Welcome back"
                    description="Million users are waiting for the new content. Keep going!"
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
                <AuthForm title="Sign in" description="Please enter your details" onSubmit={handleSubmit(onSubmit)}>
                    {nullable(signinMutation.error, (err) => (
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
                        <Button stretched view="primary" type="submit" text="Continue blogging" />
                    </FormActions>

                    <FormTip>
                        Don't have an account?{' '}
                        <Link color="var(--text-primary)" view="inline" to={routes.authSignup()}>
                            Sign up
                        </Link>
                        .
                    </FormTip>
                </AuthForm>
            </div>
        </AuthPage>
    );
};
