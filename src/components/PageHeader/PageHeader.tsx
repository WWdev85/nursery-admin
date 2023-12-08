
import { useContext } from 'react';
import './PageHeader.scss';
import { SettingsContext } from '../../contexts';
import { Logo } from '../Logo';
import { HeaderMenu } from './HeaderMenu';

interface PageHeaderProps {
    isNavbarOpen: boolean;
    setIsNavbarOpen: Function;
}

export const PageHeader = (props: PageHeaderProps) => {
    const { isNavbarOpen, setIsNavbarOpen } = props;
    const { logo } = useContext(SettingsContext) || {}

    return (
        <section className='page-header'>
            <div className='header'>
                <Logo className='header__logo' logo={logo?.url} />
                <HeaderMenu className='header__menu' isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />



            </div>
        </section >
    )
}