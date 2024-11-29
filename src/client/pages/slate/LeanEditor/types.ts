import { BaseEditor, Descendant, Element } from 'slate';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

export type DefaultLeanEditor = BaseEditor & ReactEditor & { type: 'editor' };
export type DefaultElementModes = { mode?: { inline: boolean; void: boolean } };

export type DefaultMarks = { bold?: boolean; code?: boolean; italic?: boolean };
export type LeanEditorMarkProps = RenderLeafProps & { className?: string };

export type LeanEditorText = { type: 'text'; text: string } & DefaultMarks & DefaultElementModes;
export type ParagraphElement = { type: 'paragraph'; children: LeanEditorText[] } & DefaultElementModes;
export type HeadingElement = { type: 'heading'; children: LeanEditorText[] } & DefaultElementModes;
export type SlashCommandElement = { type: 'slashCommand'; children: LeanEditorText[] } & DefaultElementModes;

export interface LeanEditorElementProps<CustomElement extends { type: string } = { type: string }> {
    element: (Element & { type: string }) | CustomElement;
    attributes: RenderElementProps['attributes'];
    children: RenderElementProps['children'];

    className?: string;
}

export type LeanEditorAst = Descendant;

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & { type: 'editor' };
        Element: LeanEditorText | ParagraphElement | HeadingElement | SlashCommandElement;
        Text: LeanEditorText;
    }
}
