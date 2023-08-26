import './Title.css';

interface Props {
    children: any;
}

export default ({children}: Props) => {
    return <h3 className="title">
        {children}
    </h3>;
} 