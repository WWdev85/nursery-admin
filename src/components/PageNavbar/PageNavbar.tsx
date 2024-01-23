import clsx from 'clsx';
import './PageNavbar.scss';
import { Link } from 'react-router-dom';
import { NavbarLink } from './Link';
import { FaBook, FaBriefcase, FaBuildingUser, FaGear, FaHouse } from "react-icons/fa6";
import { FaUserCog } from 'react-icons/fa';


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
            <Link to={'/settings'}><NavbarLink icon={<FaGear />} name={"Ustawienia"} /></Link>
            <Link to={'/admins'}><NavbarLink icon={<FaUserCog />} name={"Administratorzy"} /></Link>
            <Link to={'/curriculums'}><NavbarLink icon={<FaBook />} name={"Programy nauczania"} /></Link>
        </section>
    )
}
