import { useCallback, useState } from 'react';
import { BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';

import { DefaultLeanEditor } from './types';

interface UseSlashCommandProps {
    editor: DefaultLeanEditor;
}

const previousCharPattern = /^\s?$/;

export const useSlashCommand = ({ editor }: UseSlashCommandProps) => {
    const [cursorPosition, setCursorPosition] = useState<null | BaseSelection>(null);

    const onSlashCommand = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === '/') {
                e.preventDefault();

                let prevChar = '';

                // save cursor position to return focus when slashCommand node is destroyed
                setCursorPosition(() => editor.selection);

                if (editor.selection && editor.selection.anchor.offset > 0) {
                    prevChar = editor.string({
                        anchor: editor.selection.anchor,
                        focus: { path: editor.selection.anchor.path, offset: editor.selection.anchor.offset - 1 },
                    });
                }

                if (previousCharPattern.test(prevChar)) {
                    editor.insertNode({
                        type: 'slashCommand',
                        mode: { inline: true, void: true },
                        children: [{ type: 'text', text: ' ' }],
                    });
                }
            }
        },
        [editor],
    );

    const onSlashCommandClose = useCallback(() => {
        editor.removeNodes({
            match: (n) => n.type === 'slashCommand',
        });

        if (!cursorPosition) return;

        editor.select(cursorPosition);
        ReactEditor.focus(editor);
    }, [cursorPosition, editor]);

    const onSlashCommandClick = useCallback(
        (cb: () => void) => () => {
            if (!cursorPosition) return;

            cb();

            editor.removeNodes({
                match: (n) => n.type === 'slashCommand',
            });

            editor.select(cursorPosition);
            ReactEditor.focus(editor);
        },
        [editor, cursorPosition],
    );

    return { onSlashCommand, onSlashCommandClose, onSlashCommandClick };
};
