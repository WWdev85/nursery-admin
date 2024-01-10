import { useEffect, useState } from 'react';
import { IconButton, Input, InputType, RepeaterItemFlag } from '../../../components';
import './Subject.scss';
import { FaTrashAlt } from 'react-icons/fa';

export interface SubjectInterface {
    id: string;
    name: string;
    flag?: RepeaterItemFlag;
}

export interface SubjectProps {
    id: string;
    items: SubjectInterface[],
    setItems?: Function,
    flag?: RepeaterItemFlag,
}



export const Subject = (props: SubjectProps) => {
    const { id, items, setItems } = props;

    const [name, setName] = useState<string | undefined>("")
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)


    useEffect(() => {
        const subject = items.find(subject => subject.id === id)
        setName(() => subject?.name)
        // if (role?.staffCount && role.staffCount > 0) {
        //     setIsButtonDisabled(true)
        // }

    }, [items, id])



    const handleChangeName = (value: string) => {
        setName(() => value)
        items.map((item: SubjectInterface) => {
            if (item.id === id) {
                item.name = value
            }
            return item
        })
    }

    const handleDelete = () => {
        const newItems = items.map((item: SubjectInterface) => {
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
        <div className='subject'>
            <Input className={'subject__name'} type={InputType.Text} value={name} onChangeFn={handleChangeName} />
            <IconButton className={'actions__button actions__button--trash'} icon={<FaTrashAlt />} disabled={isButtonDisabled} id={id} onClickFn={handleDelete} />
        </div>
    )
}