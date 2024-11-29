import React, { useCallback } from 'react';
import { Descendant } from 'slate';
import { Slate } from 'slate-react';

import type { DefaultLeanEditor, LeanEditorAst } from './types';

interface LeanViewProps {
    editor: DefaultLeanEditor;

    className?: string;
    initialValue: LeanEditorAst[];
    children?: React.ReactNode;

    onEditorValueChange?: (value: LeanEditorAst[]) => void;
}

export const LeanView: React.FC<LeanViewProps> = ({
    editor,
    initialValue,
    className,
    children,
    onEditorValueChange,
}) => {
    const onEditorChange = useCallback(
        (value: Descendant[]) => {
            // is ast changed
            if (editor.operations.some((op) => op.type !== 'set_selection')) {
                onEditorValueChange?.(value);
            }

            // on selection
            if (editor.operations.some((op) => op.type === 'set_selection')) {
                console.log('set_selection', editor.operations, editor.selection, editor.string(editor.selection));
            }
        },
        [editor, onEditorValueChange],
    );

    return (
        <div className={className}>
            <Slate editor={editor} initialValue={initialValue} onChange={onEditorChange}>
                {children}
            </Slate>
        </div>
    );
};
