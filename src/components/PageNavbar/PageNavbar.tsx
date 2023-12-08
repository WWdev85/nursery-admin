import clsx from 'clsx';
import './PageNavbar.scss';

interface PageNavbarProps {
    isNavbarOpen: boolean;
}

export const PageNavbar = (props: PageNavbarProps) => {
    const { isNavbarOpen } = props;

    const navbarClass = clsx('page-navbar', { 'page-navbar--opened': isNavbarOpen })

    return (
        <section className={navbarClass}>

        </section>
    )
}