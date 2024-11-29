import { useCallback, useEffect, useRef, useState } from 'react';

import { Popup } from '../../../components/Popup/Popup';

import { useKeyboard, KeyCode } from './useKeyboard';
import { LeanEditorElementProps } from './types';

interface SlashCommandProps extends LeanEditorElementProps {
    content?: React.ReactNode;

    onClose?: () => void;
}

export const SlashCommand: React.FC<SlashCommandProps> = ({ attributes, className, content, onClose, children }) => {
    const [opened, setOpened] = useState(false);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    const setTriggerRef = useCallback((el: HTMLSpanElement | null) => {
        if (!el) return;

        triggerRef.current = el;
        setOpened(true);
    }, []);

    useEffect(() => {
        if (opened) {
            contentRef.current?.focus();
        }
    }, [opened]);

    const onCancel = useCallback(() => {
        setOpened(false);
        onClose?.();
    }, [onClose]);

    const [onESC] = useKeyboard([KeyCode.Escape], () => onCancel());

    return (
        <span {...attributes} className={className}>
            {children}

            <span ref={setTriggerRef}></span>

            <Popup interactive visible={opened} arrow={false} reference={triggerRef} onClickOutside={() => onCancel()}>
                <div tabIndex={-1} ref={contentRef} {...onESC}>
                    {content}
                </div>
            </Popup>
        </span>
    );
};
