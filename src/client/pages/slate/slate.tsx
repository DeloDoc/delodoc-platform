import cn from 'classnames';
import React, { useCallback } from 'react';
import { Range } from 'slate';

import {
    useLeanEditor,
    LeanView,
    LeanEditor,
    useDefaultMarks,
    DefaultMark,
    DefaultElement,
    LeanEditorAst,
    LeanEditorElementProps,
    LeanEditorMarkProps,
    useSlashCommand,
    SlashCommand,
    DefaultHeading,
} from './LeanEditor';
import s from './slate.module.scss';
import { KeyCode } from './LeanEditor/useKeyboard';

const initialValue: LeanEditorAst[] = [
    {
        type: 'paragraph',
        children: [{ type: 'text', text: 'A line of text in a paragraph.' }],
    },
];

const SlatePage = () => {
    const { editor } = useLeanEditor();

    const { setCodeMark, setBoldMark, setItalicMark } = useDefaultMarks({ editor });
    const [onCodeMarkHotkey, codeMarkAction] = setCodeMark();
    const [onBoldMarkHotkey, boldMarkAction] = setBoldMark();
    const [onItalicMarkHotkey, italicMarkAction] = setItalicMark();

    const { onSlashCommand, onSlashCommandClose, onSlashCommandClick } = useSlashCommand({ editor });

    const onEditorKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            onCodeMarkHotkey(e);
            onBoldMarkHotkey(e);
            onItalicMarkHotkey(e);

            onSlashCommand(e);

            // must be moved to extension
            if (editor.selection && Range.isCollapsed(editor.selection)) {
                if (e.keyCode === KeyCode.Enter) {
                    // to reset node type after insertion
                    setTimeout(() => {
                        editor.setNodes({ type: 'paragraph' });
                    }, 0);
                }
            }
        },
        [editor, onBoldMarkHotkey, onCodeMarkHotkey, onItalicMarkHotkey, onSlashCommand],
    );

    const onEditorValueChange = useCallback((value: LeanEditorAst[]) => {
        console.log('value', value);
    }, []);

    const renderMark = useCallback(
        (props: LeanEditorMarkProps) => (
            <DefaultMark
                {...props}
                className={cn({
                    [s.CodeMark]: props.leaf.code,
                    [s.BoldMark]: props.leaf.bold,
                    [s.ItalicMark]: props.leaf.italic,
                })}
            />
        ),
        [],
    );

    const renderElement = useCallback(
        (props: LeanEditorElementProps) => {
            switch (props.element.type) {
                case 'slashCommand':
                    return (
                        <SlashCommand
                            {...props}
                            className={s.SlashCommand}
                            onClose={onSlashCommandClose}
                            content={
                                <div className={s.SlashCommandMenu}>
                                    <button
                                        onClick={onSlashCommandClick(() => {
                                            editor.setNodes({
                                                type: 'heading',
                                            });
                                        })}
                                    >
                                        Heading H1
                                    </button>
                                </div>
                            }
                        />
                    );
                case 'heading':
                    return <DefaultHeading {...props} className={s.DefaultHeading} />;
                default:
                    return <DefaultElement {...props} className={s.DefaultElement} />;
            }
        },
        [editor, onSlashCommandClose, onSlashCommandClick],
    );

    return (
        <div>
            <LeanView
                className={cn(s.LeanView)}
                editor={editor}
                initialValue={initialValue}
                onEditorValueChange={onEditorValueChange}
            >
                <div>
                    <button onMouseDown={boldMarkAction}>Bold</button>
                    <button onMouseDown={italicMarkAction}>Italic</button>
                    <button onMouseDown={codeMarkAction}>Code</button>
                </div>

                <LeanEditor
                    className={s.LeanEditor}
                    renderElement={renderElement}
                    renderMark={renderMark}
                    onEditorKeyDown={onEditorKeyDown}
                />
            </LeanView>
        </div>
    );
};

export default SlatePage;
