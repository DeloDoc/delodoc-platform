import { LeanEditorMarkProps } from './types';

export const DefaultMark: React.FC<LeanEditorMarkProps> = ({ leaf, attributes, className, children }) => {
    const Tag = leaf.code ? 'code' : 'span';

    return (
        <Tag {...attributes} className={className}>
            {children}
        </Tag>
    );
};
