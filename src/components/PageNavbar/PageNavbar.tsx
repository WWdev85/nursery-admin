import clsx from 'clsx';
import './PageNavbar.scss';
import { Link } from 'react-router-dom';
import { NavbarLink } from './Link';
import { FaBook, FaBriefcase, FaBuildingUser, FaHouse } from "react-icons/fa6";


interface PageNavbarProps {
    isNavbarOpen: boolean;
}

export const PageNavbar = (props: PageNavbarProps) => {
    const { isNavbarOpen } = props;

    const navbarClass = clsx('page-navbar', { 'page-navbar--opened': isNavbarOpen })

    return (
        <section className={navbarClass}>
            <Link to={'/'}><NavbarLink icon={<FaHouse />} name={"Dashboard"} /></Link>
            <Link to={'/staff'}><NavbarLink icon={<FaBuildingUser />} name={"Pracownicy"} /></Link>
            <Link to={'/roles'}><NavbarLink icon={<FaBriefcase />} name={"Role"} /></Link>
            <Link to={'/subjects'}><NavbarLink icon={<FaBook />} name={"Przedmioty"} /></Link>
        </section>
    )
}

