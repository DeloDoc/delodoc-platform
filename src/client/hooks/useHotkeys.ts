import { useEffect } from 'react';
import { tinykeys } from 'tinykeys';

import { useRouter } from './useRouter';

export const goHomeKeys = ['g h', 'п р'];

export function isEventTargetInputOrTextArea(eventTarget: EventTarget | null) {
    if (eventTarget === null) return false;

    const eventTargetTagName = (eventTarget as HTMLElement).tagName.toLowerCase();

    return ['input', 'textarea'].includes(eventTargetTagName);
}

type HotkeyDeclaration = [string[], (e: KeyboardEvent) => void];

export const createHotkeys = (...args: HotkeyDeclaration[]): Record<string, (e: KeyboardEvent) => void> => {
    const declarations: Record<string, (e: KeyboardEvent) => void> = {};

    args.forEach((decl) => {
        decl[0].forEach((key) => {
            // https://github.com/jamiebuilds/tinykeys/issues/17#issuecomment-847867271
            // eslint-disable-next-line prefer-destructuring
            declarations[key] = (e: KeyboardEvent) => {
                if (!isEventTargetInputOrTextArea(e.target)) {
                    decl[1](e);
                }
            };
        });
    });

    return declarations;
};

export const useHotkeys = () => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = tinykeys(window, createHotkeys([goHomeKeys, () => router.index()]));

        return () => unsubscribe();
    });
};

export const useHotkey = (key: string, cb: () => void) => {
    useEffect(() => {
        const unsubscribe = tinykeys(window, createHotkeys([[key], () => cb()]));

        return () => {
            unsubscribe();
        };
    });
};
