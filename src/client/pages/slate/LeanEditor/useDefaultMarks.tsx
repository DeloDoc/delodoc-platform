import { useCallback, useMemo } from 'react';
import { Editor } from 'slate';

import { DefaultMarks, DefaultLeanEditor } from './types';

const hasMark = (editor: DefaultLeanEditor, type: keyof DefaultMarks) => Boolean(Editor.marks(editor)?.[type]);

const createToggleMark = (editor: DefaultLeanEditor) => (mark: keyof DefaultMarks) => {
    if (hasMark(editor, mark)) {
        Editor.removeMark(editor, mark);
    } else {
        Editor.addMark(editor, mark, true);
    }
};

interface UseDefaultMarksProps {
    editor: DefaultLeanEditor;
}

type DefaultMarkCallback = () => [(e: React.KeyboardEvent<HTMLDivElement>) => void, (e: React.MouseEvent) => void];

export const useDefaultMarks = ({ editor }: UseDefaultMarksProps) => {
    const toggleMark = useMemo(() => createToggleMark(editor), [editor]);
    const preventedToggleMark = useCallback(
        (e: React.KeyboardEvent | React.MouseEvent, mark: keyof DefaultMarks) => {
            e.preventDefault();
            toggleMark(mark);
        },
        [toggleMark],
    );

    const setCodeMark = useCallback<DefaultMarkCallback>(
        () => [
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === '`' && e.metaKey) {
                    preventedToggleMark(e, 'code');
                }
            },
            (e: React.MouseEvent) => preventedToggleMark(e, 'code'),
        ],
        [preventedToggleMark],
    );

    const setBoldMark = useCallback<DefaultMarkCallback>(
        () => [
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if ((e.key === 'b' || e.key === 'и') && e.metaKey) {
                    preventedToggleMark(e, 'bold');
                }
            },
            (e: React.MouseEvent) => preventedToggleMark(e, 'bold'),
        ],
        [preventedToggleMark],
    );

    const setItalicMark = useCallback<DefaultMarkCallback>(
        () => [
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if ((e.key === 'i' || e.key === 'ш') && e.metaKey) {
                    preventedToggleMark(e, 'italic');
                }
            },
            (e: React.MouseEvent) => preventedToggleMark(e, 'italic'),
        ],
        [preventedToggleMark],
    );

    return { setCodeMark, setBoldMark, setItalicMark };
};
