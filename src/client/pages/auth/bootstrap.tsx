import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { DocumentTextIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { trpc } from '../../utils/trpc';
import type { FirstSignupSchema } from '../../../server/contract/schema/auth';
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
import { AuthPromo, AuthPromoList, AuthPromoListItem } from '../../components/AuthPromo/AuthPromo';
import { routes } from '../../../server/contract/routes';

export default () => {
    const router = useRouter();
    const { resolvedTheme: theme } = useTheme();

    const firstSignupMutation = trpc.auth.firstSignup.useMutation();

    const { register, handleSubmit } = useForm<FirstSignupSchema>({
        email: '',
        password: '',
        project: '',
        theme,
    });

    const onSubmit = useCallback(
        async (data: FirstSignupSchema) => {
            await firstSignupMutation.mutateAsync(data);

            if (!firstSignupMutation.error) {
                router.index();
            }
        },
        [firstSignupMutation, router],
    );

    return (
        <AuthPage>
            <div>
                <AuthPromo
                    title="Let's publish?"
                    description="Create your first blog in one step. Complete blog name and administrator credentials."
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
                <AuthForm
                    title="Welcome to DeloDoc"
                    description="The documents platform"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {nullable(firstSignupMutation.error, (err) => (
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

                    <FormField {...register('project')}>
                        <FormFieldLabel>Blog name</FormFieldLabel>
                        <FormFieldInput>
                            <Input />
                        </FormFieldInput>
                    </FormField>

                    <FormActions>
                        <Button stretched view="primary" type="submit" text="Start blogging" />
                    </FormActions>
                </AuthForm>
            </div>
        </AuthPage>
    );
};
