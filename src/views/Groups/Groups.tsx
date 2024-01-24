import { ReactNode, useContext, useState } from "react";
import { Button, Column, ConfirmDelete, ContentWrapper, Modal, Table } from "../../components"
import './Groups.scss';
import { CreateGroupForm } from "./CreateGroupForm/CreateGroupForm";
import { deleteItem, get } from "../../functions";
import { AuthContext } from "../../contexts";
import { AdminRole } from "../../types";


export const Groups = () => {
    const { admin } = useContext(AuthContext) || {}
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns: Column[] = [

        {
            title: "Nazwa",
            key: "name",
            width: 200
        },
        {
            title: "Wychowawca",
            key: "teacher.fullName",
            width: 200
        },
        {
            title: "Program",
            key: "curriculum.name",
            width: 200
        },
        {
            title: "Administrator",
            key: "admins",
            width: 200
        },



    ];

    const editGroup = (id: string) => {
        const edit = <CreateGroupForm id={id} onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={edit} title={"Edytuj grupę"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }


    const createGroup = () => {
        const create = <CreateGroupForm onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={create} title={"Utwórz grupę"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const handleDeleteGroup = async (id: string) => {
        const group = await get(`/group/get-one/${id}`)
        const deleteAdmin = () => {
            deleteItem(`/group/delete/${id}`)
            changeTableKey()
        }
        const confirm = <ConfirmDelete message={'Czy na pewno chcesz usunąć grupę:'} item={` ${group.name}?`} deleteFn={deleteAdmin} cancelFn={handleCloseModal} />
        setModal(<Modal className={"delete-modal"} children={confirm} title={"Usuń grupę"} closeFn={handleCloseModal} />)
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
            <ContentWrapper className={'admins__wrapper admins-wrapper'} title={'Grupy'}>
                <Table className="admins-table " key={tableKey} sourceUrl={'/group/get-all'} columns={columns} actions={true} orderBy="" editItemFn={editGroup} deleteItemFn={handleDeleteGroup} />
                {admin?.role === AdminRole.SuperAdmin && <Button className={'content-wrapper__add-button'} text={'Dodaj'} disabled={false} onClickFn={createGroup} />}
            </ContentWrapper>
            {isModalOpen && modal}
        </div>
    )
}