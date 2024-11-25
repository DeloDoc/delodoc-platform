import { useParams } from 'react-router-dom';

export default () => {
    const { id } = useParams();

    return <div>Tag {id}</div>;
};
