import { ReactNode } from 'react';
import './Link.scss';
import { Icon } from '../../../components';

interface NavbarLinkProps {
    icon: ReactNode;
    name: string;
}

export const NavbarLink = (props: NavbarLinkProps) => {
    const { icon, name } = props;

    return (
        <div className='navbar-link'>
            <Icon className='navbar-link__icon' icon={icon} />
            <p className='navbar-link__name'>{name}</p>
        </div>
    )
}