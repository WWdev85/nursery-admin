import clsx from 'clsx';
import './Logo.scss';
interface LogoProps {
    logo: string | undefined
    className?: string
    onClickFn?: Function
};

export const Logo = (props: LogoProps) => {
    const { logo, className, onClickFn } = props;
    const logoClass = clsx(`${className} logo`);

    const handleClick = () => {
        if (onClickFn) {
            onClickFn()
        }
    }
    return (
        <div className={logoClass} style={{ backgroundImage: `url(${logo})` }} onClick={handleClick}></div>
    )
}