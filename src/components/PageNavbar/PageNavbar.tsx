import clsx from 'clsx';
import './PageNavbar.scss';
import { Link } from 'react-router-dom';
import { NavbarLink } from './Link';
import { FaBook, FaBriefcase, FaBuildingUser, FaGear, FaHouse, FaPeopleGroup } from "react-icons/fa6";
import { FaUserCog } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { AdminRole } from '../../types';


interface PageNavbarProps {
    isNavbarOpen: boolean;
}

export const PageNavbar = (props: PageNavbarProps) => {
    const { isNavbarOpen } = props;

    const { admin } = useContext(AuthContext) || {}
    const navbarClass = clsx('page-navbar', { 'page-navbar--opened': isNavbarOpen })

    return (
        <section className={navbarClass}>
            {admin?.role === AdminRole.SuperAdmin && <>
                <Link to={'/'}><NavbarLink icon={<FaHouse />} name={"Dashboard"} /></Link>
                <Link to={'/staff'}><NavbarLink icon={<FaBuildingUser />} name={"Pracownicy"} /></Link>
                <Link to={'/roles'}><NavbarLink icon={<FaBriefcase />} name={"Role"} /></Link>
                <Link to={'/subjects'}><NavbarLink icon={<FaBook />} name={"Przedmioty"} /></Link>
                <Link to={'/settings'}><NavbarLink icon={<FaGear />} name={"Ustawienia"} /></Link>
                <Link to={'/admins'}><NavbarLink icon={<FaUserCog />} name={"Administratorzy"} /></Link>
                <Link to={'/curriculums'}><NavbarLink icon={<FaBook />} name={"Programy nauczania"} /></Link>
            </>}
            <Link to={'/groups'}><NavbarLink icon={<FaPeopleGroup />} name={"Grupy"} /></Link>
        </section>
    )
}
