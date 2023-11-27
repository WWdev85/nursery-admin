import img from '../../assets/images/logo4.png';
import './Logo.scss';

export const Logo = () => {
    return (
        <div className={'logo'} style={{ backgroundImage: `url(${img})` }}></div>
    )
}