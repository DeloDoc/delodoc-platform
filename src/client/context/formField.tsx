/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

export interface FormFieldContextProps {
    id?: string;
    name?: string;
    value?: any;
    onChange?: (e: any) => void;
}

export const formFieldContext = createContext<FormFieldContextProps | null>(null);
