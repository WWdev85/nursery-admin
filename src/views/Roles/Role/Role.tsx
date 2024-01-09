import { useEffect, useState } from 'react';
import { IconButton, Input, InputType, RepeaterItemFlag } from '../../../components';
import './Role.scss';
import { FaTrashAlt } from 'react-icons/fa';

export interface RoleInterface {
    id: string;
    name: string;
    order: string;
    staffCount: number;
    flag?: RepeaterItemFlag;
}

export interface RoleProps {
    id: string;
    items: RoleInterface[],
    setItems?: Function,
    flag?: RepeaterItemFlag,
    order: string
}



export const Role = (props: RoleProps) => {
    const { id, items, setItems } = props;

    const [name, setName] = useState<string | undefined>("")
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)


    useEffect(() => {
        const role = items.find(role => role.id === id)
        setName(() => role?.name)
        if (role?.staffCount && role.staffCount > 0) {
            setIsButtonDisabled(true)
        }

    }, [items, id])



    const handleChangeName = (value: string) => {
        setName(() => value)
        items.map((item: RoleInterface) => {
            if (item.id === id) {
                item.name = value
            }
            return item
        })
    }

    const handleDelete = () => {
        const newItems = items.map((item: RoleInterface) => {
            if (item.id === id) {
                item.flag = RepeaterItemFlag.Deleted
            }
            return item
        })
        if (setItems) {
            setItems(() => [
                ...newItems
            ])
        }
    }
    return (
        <div className='role'>
            <Input className={'role__name'} type={InputType.Text} value={name} onChangeFn={handleChangeName} />
            <IconButton className={'actions__button actions__button--trash'} icon={<FaTrashAlt />} disabled={isButtonDisabled} id={id} onClickFn={handleDelete} />
        </div>
    )
}