import React from 'react';
import { Editable, RenderPlaceholderProps } from 'slate-react';

import { LeanEditorElementProps, LeanEditorMarkProps } from './types';

interface LeanEditorProps {
    className?: string;
    readOnly?: boolean;

    renderPlaceholder?: (props: RenderPlaceholderProps) => React.ReactElement;
    renderMark?: (props: LeanEditorMarkProps) => React.ReactElement;
    renderElement?: (props: LeanEditorElementProps) => React.ReactElement;
    onEditorKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const LeanEditor: React.FC<LeanEditorProps> = ({
    className,
    readOnly,
    renderPlaceholder,
    renderMark,
    renderElement,
    onEditorKeyDown,
}) => {
    return (
        <Editable
            className={className}
            readOnly={readOnly}
            renderPlaceholder={renderPlaceholder}
            renderLeaf={renderMark}
            renderElement={renderElement}
            onKeyDown={onEditorKeyDown}
        />
    );
};
