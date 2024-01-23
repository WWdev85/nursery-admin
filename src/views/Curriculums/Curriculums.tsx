import { ReactNode, useState } from "react";
import { Button, Column, ConfirmDelete, ContentWrapper, Modal, Table } from "../../components"
import { deleteItem, get } from "../../functions";
import './Curriculums.scss';
import { CreateCurriculum } from "./CreateCurriculum.tsx/CreateCurriculum";


export const Curriculums = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [tableKey, setTableKey] = useState(0);

    const columns: Column[] = [
        {
            title: "Nazwa",
            key: "name",
            width: 800
        },
    ];

    const editCurriculum = (id: string) => {
        const edit = <CreateCurriculum id={id} onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={edit} title={"Edytuj program nauczania"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const createCurriculum = () => {
        const create = <CreateCurriculum onSubmitFn={changeTableKey} />
        setModal(<Modal className={"create-modal"} children={create} title={"Utwórz program nauczania"} closeFn={handleCloseModal} />)
        setIsModalOpen(true)
    }

    const handleDeleteCurriculum = async (id: string) => {
        const curriculum = await get(`/curriculum/get-one/${id}`)
        const deleteStaff = () => {
            deleteItem(`/curriculum/delete/${id}`)
            changeTableKey()
        }
        const confirm = <ConfirmDelete message={'Czy na pewno chcesz usunąć program:'} item={` ${curriculum.name}?`} deleteFn={deleteStaff} cancelFn={handleCloseModal} />
        setModal(<Modal className={"delete-modal"} children={confirm} title={"Usuń program"} closeFn={handleCloseModal} />)
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
        <div className='curriculums'>
            <ContentWrapper className={'curriculums__wrapper admins-wrapper'} title={'Programy nauczania'}>
                <Table className="curriculums-table " key={tableKey} sourceUrl={'/curriculum/get-all'} columns={columns} actions={true} orderBy="name" editItemFn={editCurriculum} deleteItemFn={handleDeleteCurriculum} />
                <Button className={'content-wrapper__add-button'} text={'Dodaj'} disabled={false} onClickFn={createCurriculum} />
            </ContentWrapper>
            {isModalOpen && modal}
        </div>
    )
}