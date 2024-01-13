
import { ContentWrapper, Repeater, RepeaterItemFlag } from '../../components';
import './Roles.scss';
import { Role, RoleInterface, RoleProps } from './Role';
import { deleteItem, patch, post } from '../..//functions';


export const Roles = () => {

    const addNewRole = (): RoleInterface => {
        return {
            id: 'new',
            name: '',
            order: '',
            staffCount: 0,
            flag: RepeaterItemFlag.Updated
        }
    }

    const handleCreateRole = async (role: RoleInterface) => {
        await post('/role/add', {
            name: role.name,
            order: role.order,
        })
    }

    const handleUpdateRole = async (role: RoleInterface) => {
        await patch('/role/update', {
            id: role.id,
            name: role.name,
            order: role.order,
        })
    }

    const handleDeleteRole = async (id: string) => {
        await deleteItem(`/role/delete/${id}`)
    }



    return (
        <div className='roles'>
            <ContentWrapper className={'roles__wrapper'} title={'Role pracownika'}  >
                <Repeater<RoleProps> draggable={true} componentType={Role} createElementFn={addNewRole} sourceUrl='/role/get-all?page=1&limit=100&orderBy=order&order=ASC' createFn={handleCreateRole} updateFn={handleUpdateRole} deleteFn={handleDeleteRole} />
            </ContentWrapper>
        </div>
    )
}