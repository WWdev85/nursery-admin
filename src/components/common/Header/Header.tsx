import './Header.scss';

interface HeeaderProps {
    title: string;
}

export const Header = (props: HeeaderProps) => {
    const { title } = props;
    return (
        <div className='header'>
            <div className='header__title'>{title}</div>
        </div>
    )
}