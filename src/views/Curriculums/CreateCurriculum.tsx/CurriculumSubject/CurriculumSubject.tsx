import { useEffect, useState } from 'react';
import { IconButton, Input, InputType, RepeaterItemFlag, Select, SelectOption } from '../../../../components';
import { FaTrashAlt } from 'react-icons/fa';
import './CurriculumSubject.scss';

export interface CurriculumSubjectInterface {
    id: string;
    name: string;
    weeklyHours: number;
    options: SelectOption[];
    flag?: RepeaterItemFlag;

}

export interface CurriculumSubjectProps {
    id: string;
    name: string;
    weeklyHours: number;
    options: SelectOption[];
    items: CurriculumSubjectInterface[],
    setItems?: Function,
    flag?: RepeaterItemFlag;
}

export const CurriculumSubject = (props: CurriculumSubjectProps) => {
    const { id, name, weeklyHours, options, items, setItems } = props;
    const [subject, setSubject] = useState<string>("")
    const [hours, setHours] = useState<number>(0)

    useEffect(() => {
        setSubject(id)
        setHours(() => weeklyHours)

    }, [id, name, weeklyHours])


    const handleChangeSubject = (option: SelectOption) => {
        setSubject(option.value as string)
        const newItems = items.map(item => {
            if (item.id === id) {
                item.id = option.value as string
                item.name = option.label as string
            }
            return item
        })

        if (setItems)
            setItems(() => newItems)


    }

    const handleChangeHours = (value: number) => {
        setHours(value)
        const newItems = items.map(item => {
            if (item.id === id) {
                item.weeklyHours = value;
            }
            return item
        })
        if (setItems) {
            setItems(() => [
                ...newItems
            ])
        }
    }

    const handleDelete = () => {
        const newItems = items.filter((item) => item.id !== id
        )
        if (setItems) {
            setItems(() => [
                ...newItems
            ])
        }
    }


    return (
        <div className='curriculum-subject'>
            <Select className={'curriculum-subject__select'} options={options} searchInput={true} disabledOptionsIds={items.map(item => item.id)} selected={subject} onChangeFn={handleChangeSubject} />
            <Input className={'curriculum-subject__input'} type={InputType.Number} min={1} value={hours} onChangeFn={handleChangeHours} />
            <IconButton className={'actions__button actions__button--trash subject__delete'} icon={<FaTrashAlt />} id={'sss'} onClickFn={handleDelete} />
        </div>
    )
}