import { useEffect, useState } from 'react';
import { IconButton, Input, InputType, RepeaterItemFlag, Select, SelectOption } from '../../../components';
import './Subject.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { Staff } from '../../../types';

export interface SubjectInterface {
    id: string;
    name: string;
    staffMembers?: Staff[]
    staffIds: string[];
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
    const [staffMembers, setStaffMembers] = useState<string[]>([])
    const [options, setOptions] = useState<SelectOption[]>([])



    useEffect(() => {
        const subject = items.find(subject => subject.id === id)
        setName(() => subject?.name)
        if (subject?.staffMembers) {
            const staff: string[] = []
            const opt: SelectOption[] = []
            subject.staffMembers?.map(staffMember => {
                if (staffMember.id) {
                    staff.push(staffMember.id)
                    opt.push({
                        value: staffMember.id,
                        label: staffMember.name + " " + staffMember.surname
                    })
                }
                return staffMember
            })
            setStaffMembers(() => staff)
            setOptions(() => opt)
        }
    }, [items, id])

    useEffect(() => {
        items.map((item: SubjectInterface) => {
            if (item.id === id) {
                item.staffIds = staffMembers
            }
            return item
        })
    }, [staffMembers, id, items])

    const handleChangeName = (value: string) => {
        setName(() => value)
        items.map((item: SubjectInterface) => {
            if (item.id === id) {
                item.name = value
                item.flag = RepeaterItemFlag.Updated
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

    const handleChanngeTeachers = (subjects: string[]) => {
        setStaffMembers(subjects)
        items.map((item: SubjectInterface) => {
            if (item.id === id) {
                item.staffIds = subjects
                item.flag = RepeaterItemFlag.Updated
            }
            return item
        })
    }

    return (
        <div className='subject'>
            <Input className={'subject__name'} type={InputType.Text} value={name} onChangeFn={handleChangeName} />
            <Select className={'subject__staff-members'} options={options} multi={true} searchInput={true} selected={staffMembers} optionsUrl={'/staff/get-teachers?page=1&limit=11'} onChangeFn={handleChanngeTeachers} />
            <IconButton className={'actions__button actions__button--trash subject__delete'} icon={<FaTrashAlt />} id={id} onClickFn={handleDelete} />
        </div>
    )
}