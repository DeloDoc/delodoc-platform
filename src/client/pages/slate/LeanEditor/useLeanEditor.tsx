import { useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

export const useLeanEditor = () => {
    const [editor] = useState(() => withReact(withHistory(createEditor())));
    const { isInline, isVoid } = editor;

    editor.isInline = (element) => element.mode?.inline || isInline(element);
    editor.isVoid = (element) => element.mode?.void || isVoid(element);

    return { editor };
};
