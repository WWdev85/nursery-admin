import clsx from 'clsx';
import './Logo.scss';
interface LogoProps {
    logo: string | undefined
    className?: string
};

export const Logo = (props: LogoProps) => {
    const { logo, className } = props;
    const logoClass = clsx(`${className} logo`);
    return (
        <div className={logoClass} style={{ backgroundImage: `url(${logo})` }}></div>
    )
}