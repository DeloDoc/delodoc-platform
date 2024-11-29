import { LeanEditorElementProps } from './types';

export const DefaultHeading: React.FC<LeanEditorElementProps> = ({ attributes, className, children }) => (
    <h1 {...attributes} className={className}>
        {children}
    </h1>
);
