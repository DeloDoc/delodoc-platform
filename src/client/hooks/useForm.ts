/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export function useForm<T = object>(defaultValue: Record<keyof T, any> = {} as T) {
    const [formState, setFormState] = useState<T>(defaultValue);

    return {
        register: (fieldName: keyof T) => ({
            id: fieldName,
            name: fieldName,
            value: formState[fieldName],
            onChange: (e: any) => {
                setFormState({
                    ...formState,
                    [fieldName]: e.currentTarget.value,
                });
            },
        }),
        handleSubmit: (cb: (data: T) => void) => (e: any) => {
            e.preventDefault();
            cb(formState);
        },
        watch: (fieldName: keyof T) => formState[fieldName],
    };
}
