import './Logo.scss';
interface LogoProps {
    logo: string | undefined
}

export const Logo = (props: LogoProps) => {
    return (
        <div className={'logo'} style={{ backgroundImage: `url(${props.logo})` }}></div>
    )
}