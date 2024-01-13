
import './Select.scss'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { get } from '../../../functions';
import { Icon } from '../Icon';
import { FaAngleDown } from 'react-icons/fa6';
import { Checkbox } from '../Checkbox';
import { Input, InputType } from '../Input';

export interface SelectOption {
    value: string | number | string[],
    label: string
}

interface SelectProps {
    className?: string;
    selected: string | number | string[];
    label?: string;
    options: SelectOption[],
    optionsUrl?: string;
    onChangeFn?: Function;
    searchInput?: boolean,
    multi?: boolean,
    disabled?: boolean,
    placeholder?: string,
}

export const Select = (props: SelectProps) => {
    const { className, label, options, optionsUrl, selected, onChangeFn, searchInput, multi, disabled, placeholder } = props

    const [selectOptions, setSelectOptions] = useState<ReactNode[]>([])
    const [search, setSearch] = useState<string | undefined>(searchInput ? "" : undefined)
    const [optionLabel, setOptionLabel] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [optionsArray, setOptionsArray] = useState<SelectOption[]>(options)

    const handleChangeSearch = useCallback((search: string) => {
        setSearch(() => search)
    }, [])



    const getOptions = useCallback(async () => {
        const response = await get(`${optionsUrl}&search=${search ? search : ''}`)
        const items = response.items.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })

        setOptionsArray(items)
    }, [search, optionsUrl])

    useEffect(() => {
        (setOptionsArray(options))
    }, [options])

    useEffect(() => {
        if (search && search?.length > 0)
            getOptions()
    }, [search, getOptions])





    const handleOptionClick = useCallback((option: SelectOption) => {

        if (onChangeFn) {
            if (multi && Array.isArray(selected)) {
                let selectedOptions = selected.map((value: string) => optionsArray.filter((option: SelectOption) => option.value === value)[0]?.value)

                if (selected.find(val => val === option.value)) {
                    selectedOptions = selectedOptions.filter(opt => opt !== option.value)
                }
                else {
                    selectedOptions.push(option.value)
                }
                onChangeFn(selectedOptions);

            } else {
                onChangeFn(option);
                setIsOpen(false);
            }

        }

    }, [onChangeFn, selected, multi, optionsArray]);

    useEffect(() => {
        let selectedOptions: string[] = []
        if (multi && Array.isArray(selected)) {

            selectedOptions = selected.map((value: string) => optionsArray.filter((option: SelectOption) => option.value === value).map((option: SelectOption) => option.label)[0])


        } else {
            selectedOptions = optionsArray.filter((option: SelectOption) => option.value === selected).map((option: SelectOption) => option.label)
        }


        const opt = optionsArray?.map((option, index) => (
            <div className={`${option.value === selected ? 'content__option content__option--selected' : 'content__option'} ${multi ? "multi" : ""}`} key={index} onClick={() => !multi && handleOptionClick(option)}>
                {multi && Array.isArray(selected) ? <Checkbox className={""} text={option.label} onChangeFn={() => (handleOptionClick(option))} checked={selected.find(val => val === option.value) ? true : false} /> : option.label}
            </div>
        ))
        if (typeof search === 'string') {
            opt.unshift(<Input className={"content__search"} key={'search'} type={InputType.Text} placeholder="wyszukaj" value={search} onChangeFn={handleChangeSearch} />)
        }
        setSelectOptions(() => opt)


        if (selectedOptions.length > 0) {
            setOptionLabel(multi ? selectedOptions.join(', ') : selectedOptions[0])
        } else {
            setOptionLabel(placeholder ? placeholder : '--------')
        }
    }, [optionsArray, selected, search, multi, placeholder, handleChangeSearch, handleOptionClick])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef])

    const toggleOpen = () => {
        if (!disabled) {
            getOptions()
            setIsOpen(!isOpen)
        };
    }

    return (
        <div className={`select ${className}`}>
            {label ? <label className={`select__label`}>{label}</label> : null}
            <div className={`dropdown ${disabled && 'disabled'}`} ref={wrapperRef}>
                <div onClick={toggleOpen} className="dropdown__trigger trigger">
                    {optionLabel}
                    <Icon className="trigger__icon" icon={<FaAngleDown />} />
                </div>
                {isOpen && (
                    <div className="dropdown__content content">
                        {selectOptions}
                    </div>
                )}
            </div>
            {/* {selectOptions && <Dropdown multi={multi} options={selectOptions} value={selected} onClickFn={onChangeFn} search={search} handleChangeSearchFn={handleChangeSearch} disabled={disabled} />} */}
        </div>
    )
}