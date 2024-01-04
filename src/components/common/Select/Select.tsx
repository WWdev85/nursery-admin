
import './Select.scss'
import { Dropdown } from './Dropdown';
import { useCallback, useEffect, useState } from 'react';
import { get } from '../../../functions';

export interface SelectOption {
    value: string | number,
    label: string
}

interface SelectProps {
    className?: string;
    selected: string | number;
    label?: string;
    options: SelectOption[] | string,
    onChangeFn?: Function;
    searchInput?: boolean,
}

export const Select = (props: SelectProps) => {
    const { className, label, options, selected, onChangeFn, searchInput } = props

    const [selectOptions, setSelectOptions] = useState<SelectOption[]>()
    const [search, setSearch] = useState<string | undefined>(searchInput ? "" : undefined)

    const handleChangeSearch = (search: string) => {
        setSearch(() => search)
    }


    const getOptions = useCallback(async (url: string) => {
        const response = await get(`${url}?page=1&limit=11&search=${search ? search : ''}`)
        const items = response.items.map((role: any) => {
            return {
                value: role.id,
                label: role.name
            }
        })
        setSelectOptions(items)
    }, [search])

    useEffect(() => {
        if (typeof options === 'string') {
            getOptions(options)
        }
        else (setSelectOptions(options))
    }, [search, getOptions, options])

    return (
        <div className={`select ${className}`}>
            {label ? <label className={`select__label`}>{label}</label> : null}
            {selectOptions && <Dropdown options={selectOptions} value={selected} onClickFn={onChangeFn} search={search} handleChangeSearchFn={handleChangeSearch} />}
        </div>
    )
}