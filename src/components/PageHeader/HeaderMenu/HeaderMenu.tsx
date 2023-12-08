
import clsx from 'clsx';
import { SlMenu, SlOptionsVertical } from "react-icons/sl";
import { IoIosLogOut } from "react-icons/io";
import { Icon, Logo } from '../../../components';
import './HeaderMenu.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts';
import { get, getFile } from '../../../functions';
import { useNavigate } from 'react-router';



interface HeaderMenuProps {
    className?: string;
    isNavbarOpen: boolean;
    setIsNavbarOpen: Function;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
    const { className, isNavbarOpen, setIsNavbarOpen } = props;

    const [photo, setPhoto] = useState<string | null>(null)
    const [isToolsOpen, setIsToolsOpen] = useState<boolean>(false)
    const { admin } = useContext(AuthContext) || {}
    const navigate = useNavigate();

    const toolsClass = clsx('header-menu__tools tools', { 'tools--opened': isToolsOpen })

    useEffect(() => {
        console.log(admin)
        if (admin) {
            console.log(admin)
            getAdminPhoto(admin.id)
        }
    }, [admin])

    const getAdminPhoto = async (id: string) => {
        const admin = await get(`/admin/get-one/${id}`);
        console.log(admin)
        const photo = await getFile(`/staff/get-photo/${admin.staff.id}`);
        setPhoto(photo.url);
    }
    console.log(photo)



    const menuClass = clsx(`${className} header-menu`);

    const openNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    }

    const openTools = () => {
        setIsToolsOpen(!isToolsOpen);
    }

    const handleLogout = async () => {
        await get(`/auth/logout`);
        navigate('/login');
    }

    return (
        <div className={menuClass} >
            < Icon className='header-menu__icon header-menu__icon--navbar' icon={< SlMenu />} onClickFn={openNavbar} />
            <div className={toolsClass}>
                {photo && <Logo className='tools__profile' logo={photo} />}
                < Icon className='tools__icon tools__icon--logout' icon={<IoIosLogOut />} onClickFn={handleLogout} />
            </div>
            < Icon className='header-menu__icon header-menu__icon--navbar' icon={< SlOptionsVertical />} onClickFn={openTools} />

        </div >
    )
}