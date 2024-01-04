
import clsx from 'clsx';
import { SlMenu, SlOptionsVertical } from "react-icons/sl";
import { IoIosLogOut } from "react-icons/io";
import { Icon, Logo, Modal } from '../../../components';
import './HeaderMenu.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts';
import { get, getFile } from '../../../functions';
import { useNavigate } from 'react-router';
import { CreateStaffForm } from '../../../views';

import { ChangePwd } from './ChangePwd';



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
    const [id, setId] = useState<string | undefined>(undefined)
    const navigate = useNavigate();
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)


    const toolsClass = clsx('header-menu__tools tools', { 'tools--opened': isToolsOpen })

    useEffect(() => {
        if (admin) {
            getAdminPhoto(admin.id)
        }
    }, [admin])

    const getAdminPhoto = async (id: string) => {
        const admin = await get(`/admin/get-one/${id}`);
        const photo = await getFile(`/staff/get-photo/${admin.staff.id}`);
        setId(admin.staff.id)
        setPhoto(photo.url);
    }

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

    const handleOpenProfile = () => {
        setIsModalOpened(true)
    }

    const handleCloseModal = () => {
        setIsModalOpened(false)
    }





    return (
        <div className={menuClass} >
            < Icon className='header-menu__icon header-menu__icon--navbar' icon={< SlMenu />} onClickFn={openNavbar} />
            <div className={toolsClass}>
                {photo && <Logo className='tools__profile' logo={photo} onClickFn={handleOpenProfile} />}
                < Icon className='tools__icon tools__icon--logout' icon={<IoIosLogOut />} onClickFn={handleLogout} />
            </div>
            < Icon className='header-menu__icon header-menu__icon--navbar' icon={< SlOptionsVertical />} onClickFn={openTools} />
            {isModalOpened &&
                <Modal className={'header-menu__modal'} title={'Mój profil'} closeFn={handleCloseModal}>
                    <CreateStaffForm id={id} />
                    <ChangePwd />
                </Modal>
            }
        </div >
    )
}