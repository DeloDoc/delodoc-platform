import { LeanEditorElementProps } from './types';

export const DefaultElement: React.FC<LeanEditorElementProps> = ({ attributes, className, children }) => (
    <p {...attributes} className={className}>
        {children}
    </p>
);
