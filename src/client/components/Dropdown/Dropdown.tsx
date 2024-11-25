import React, { createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { Popup } from '../Popup/Popup';

import s from './Dropdown.module.scss';

interface DropdownProps {
    hideOnClick?: boolean;
    readonly?: boolean;
}

interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    error?: { message: string };
}

interface DropdownContextProps {
    readonly?: boolean;
    isOpen?: boolean;
    toggle: () => void;
    setTriggerRef: (el: HTMLSpanElement) => void;
    dropdownRef: React.MutableRefObject<HTMLSpanElement | null>;
    hideOnClick?: boolean;
}

export const dropdownContext = createContext<DropdownContextProps>({
    toggle: () => {},
    setTriggerRef: () => {},
    dropdownRef: { current: null },
});

export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({ children, readonly, hideOnClick }) => {
    const [opened, setOpened] = useState(false);
    const dropdownRef = useRef<HTMLSpanElement | null>(null);
    const setTriggerRef = useCallback((el: HTMLSpanElement) => {
        dropdownRef.current = el;
    }, []);

    const value = useMemo(
        () => ({
            isOpen: opened,
            readonly,
            toggle: () => setOpened((p) => !p),
            dropdownRef,
            setTriggerRef,
            hideOnClick,
        }),
        [hideOnClick, opened, readonly, setTriggerRef],
    );

    return <dropdownContext.Provider value={value}>{children}</dropdownContext.Provider>;
};

export const DropdownArrow: React.FC = () => (
    <dropdownContext.Consumer>
        {({ isOpen, readonly }) =>
            nullable(!readonly, () =>
                isOpen ? (
                    <ChevronUpIcon className={s.DropdownTriggerIcon} />
                ) : (
                    <ChevronDownIcon className={s.DropdownTriggerIcon} />
                ),
            )
        }
    </dropdownContext.Consumer>
);

export const DropdownTrigger = forwardRef<HTMLDivElement, React.PropsWithChildren<DropdownTriggerProps>>(
    ({ children, className, ...attrs }, ref) => (
        <dropdownContext.Consumer>
            {({ toggle, setTriggerRef, readonly }) => (
                <div className={cn(s.DropdownTrigger, className)} {...attrs} ref={ref}>
                    <span onClick={!readonly ? toggle : undefined} ref={setTriggerRef}>
                        {children}
                    </span>
                </div>
            )}
        </dropdownContext.Consumer>
    ),
);

interface DropdownPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownPanel: React.FC<
    React.PropsWithChildren<DropdownPanelProps & React.ComponentProps<typeof Popup>>
> = ({ className, children, placement = 'bottom', onClick, offset = [0, 10], ...attrs }) => {
    const { isOpen, toggle, dropdownRef, hideOnClick } = useContext(dropdownContext);

    const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            if (hideOnClick) {
                toggle();
            }
            onClick?.(event);
        },
        [hideOnClick, onClick, toggle],
    );

    return (
        <Popup
            visible={isOpen}
            interactive
            reference={dropdownRef}
            placement={placement}
            onClickOutside={toggle}
            arrow={false}
            offset={offset}
            {...attrs}
            onClick={handleClick}
            className={cn(s.DropdownPanel, className)}
        >
            {children}
        </Popup>
    );
};
