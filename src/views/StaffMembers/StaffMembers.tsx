
import { ReactNode, useState } from "react";
import { Button, Column, ContentWrapper, Table, Modal, ConfirmDelete } from "../../components"
import { deleteItem, get } from "../../functions";

import './StaffMembers.scss';
import { CreateStaffForm } from "./CreateStaffContent/CreateStaffContent";

export const StaffMembers = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns: Column[] = [
        {
            title: "Nazwisko",
            key: "surname",
            width: 200
        },
        {
            title: "Imię",
            key: "name",
            width: 200
        },
        {
            title: "E-mail",
            key: "email",
            width: 200
        },
        {
            title: "Numer telefonu",
            key: "phone",
            width: 200
        },
        {
            title: "Rola",
            key: "role.name",
            width: 200
        },
        {
            title: "Widoczny",
            key: "isVisible",
            width: 150
        },
        {
            title: "Adres",
            key: "address",
            width: 400
        },
        {
            title: "Przedmioty",
            key: "subjects",
            width: 400,
            sortable: false,
        },
    ];



    const editStaffMember = (id: string) => {
        const edit = <CreateStaffForm id={id} onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={edit} title={"Utwórz pracownika"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }


    const createStaffMember = () => {
        const create = <CreateStaffForm onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={create} title={"Utwórz pracownika"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const handleDeleteStaffMember = async (id: string) => {

        const stafMember = await get(`/staff/get-one/${id}`)
        const deleteStaff = () => {
            deleteItem(`/staff/delete/${id}`)
            changeTableKey()
        }
        const confirm = <ConfirmDelete message={'Czy na pewno chcesz usunąć pracownika:'} item={` ${stafMember.name} ${stafMember.surname}?`} deleteFn={deleteStaff} cancelFn={handleCloseModal} />
        setModal(<Modal className={"delete-modal"} children={confirm} title={"Usuń pracownika"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)

    }

    const changeTableKey = () => {
        setTableKey(() => tableKey + 1);
        setIsModalOpen(false)
    }



    return (
        <div className='staff'>
            <ContentWrapper className={'staff__wrapper'} title={'Pracownicy'}>
                <Table className="staff-table " key={tableKey} sourceUrl={'/staff/get-all'} columns={columns} actions={true} orderBy="surname" editItemFn={editStaffMember} deleteItemFn={handleDeleteStaffMember} />
                <Button className={'content-wrapper__add-button'} text={"Dodaj"} disabled={false} onClickFn={createStaffMember} />
            </ContentWrapper>
            {isModalOpen && modal}
        </div>
    )
}