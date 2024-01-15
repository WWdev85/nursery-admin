import { ReactNode, useState } from "react";
import { Button, Column, ConfirmDelete, ContentWrapper, Modal, Table } from "../../components"
import { deleteItem, get } from "../../functions";
import { CreateAdminForm } from "./CreateAdminForm/CreateAdminForm";
import './Admins.scss';


export const Admins = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns: Column[] = [

        {
            title: "Imię",
            key: "staff.name",
            width: 200
        },
        {
            title: "Nazwisko",
            key: "staff.surname",
            width: 200
        },
        {
            title: "E-mail",
            key: "staff.email",
            width: 200
        },
        {
            title: "Rola",
            key: "role",
            width: 200
        },

    ];

    const editAdmin = (id: string) => {
        const edit = <CreateAdminForm id={id} onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={edit} title={"Utwórz pracownika"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }


    const createAdmin = () => {
        const create = <CreateAdminForm onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={create} title={"Utwórz administratora"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const handleDeleteAdmin = async (id: string) => {
        const admin = await get(`/admin/get-one/${id}`)
        const deleteStaff = () => {
            deleteItem(`/admin/delete/${id}`)
            changeTableKey()
        }
        const confirm = <ConfirmDelete message={'Czy na pewno chcesz usunąć pracownika:'} item={` ${admin.staff.name} ${admin.staff.surname}?`} deleteFn={deleteStaff} cancelFn={handleCloseModal} />
        setModal(<Modal className={"delete-modal"} children={confirm} title={"Usuń pracownika"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const changeTableKey = () => {
        setTableKey(() => tableKey + 1);
        setIsModalOpen(false)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='admins'>
            <ContentWrapper className={'admins__wrapper admins-wrapper'} title={'Administratorzy'}>
                <Table className="admins-table " key={tableKey} sourceUrl={'/admin/get-all'} columns={columns} actions={true} orderBy="surname" editItemFn={editAdmin} deleteItemFn={handleDeleteAdmin} />
                <Button className={'content-wrapper__add-button'} text={'Dodaj'} disabled={false} onClickFn={createAdmin} />
            </ContentWrapper>
            {isModalOpen && modal}
        </div>
    )
}