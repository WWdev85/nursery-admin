
import { ContentWrapper, Repeater, RepeaterItemFlag } from '../../components';
import './Subjects.scss';
import { deleteItem, patch, post } from '../../functions';
import { Subject, SubjectInterface, SubjectProps } from './Subject/Subject';



export const Subjects = () => {

    const addNewSubject = (): SubjectInterface => {
        return {
            id: 'new',
            name: '',
            staffIds: [],
            flag: RepeaterItemFlag.Updated
        }
    }

    const handleCreateSubject = async (subject: SubjectInterface) => {
        await post('/subject/add', {
            name: subject.name,
            staffIds: subject.staffIds.join(",")
        })
    }

    const handleUpdateSubject = async (subject: SubjectInterface) => {
        await patch('/subject/update', {
            id: subject.id,
            name: subject.name,
            staffIds: subject.staffIds.join(",")

        })
    }

    const handleDeleteSubject = async (id: string) => {
        await deleteItem(`/subject/delete/${id}`)
    }



    return (
        <div className='roles'>
            <ContentWrapper className={'roles__wrapper'} title={'Przedmioty'}  >
                <Repeater<SubjectProps> draggable={false} componentType={Subject} createElementFn={addNewSubject} sourceUrl='/subject/get-all?page=1&limit=1000&orderBy=name&order=ASC' createFn={handleCreateSubject} updateFn={handleUpdateSubject} deleteFn={handleDeleteSubject} />
            </ContentWrapper>
        </div>
    )
}