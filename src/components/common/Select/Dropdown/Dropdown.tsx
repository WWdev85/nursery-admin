import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { SelectOption } from "../Select";

import './Dropdown.scss';
import { Icon } from "../../Icon";
import { Input, InputType } from "../../Input";

interface DropdownProps {
    options: SelectOption[];
    value: string | number;
    onClickFn?: Function;
    search?: string | undefined;
    handleChangeSearchFn?: Function;
}

export const Dropdown = (props: DropdownProps) => {
    const { options, value, onClickFn, search, handleChangeSearchFn } = props;
    const [label, setLabel] = useState<string>('')
    const [selectOptions, setSelectOptions] = useState<ReactNode[]>([])

    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleChangeSearch = useCallback((value: string) => {
        if (handleChangeSearchFn) {
            handleChangeSearchFn(value)
        }
    }, [handleChangeSearchFn])

    const handleOptionClick = useCallback((option: SelectOption) => {
        if (onClickFn) {
            onClickFn(option);
        }
        setIsOpen(false);
    }, [onClickFn]);


    useEffect(() => {
        const label = options.find((option: SelectOption) => option.value === value)?.label
        const opt = options?.map((option, index) => (
            <div className={option.value === value ? 'content__option content__option--selected' : 'content__option'} key={index} onClick={() => handleOptionClick(option)}>
                {option.label}
            </div>
        ))
        if (typeof search === 'string') {
            opt.unshift(<Input className={"content__search"} key={'search'} type={InputType.Text} placeholder="wyszukaj" value={search} onChangeFn={handleChangeSearch} />)
        }
        setSelectOptions(() => opt)


        if (label) {
            setLabel(label)
        } else {
            setLabel('--------')
        }
    }, [options, value, search, handleChangeSearch, handleOptionClick])

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

    const toggleOpen = () => setIsOpen(!isOpen);


    return (
        <div className="dropdown" ref={wrapperRef}>
            <div onClick={toggleOpen} className="dropdown__trigger trigger">
                {label}
                <Icon className="trigger__icon" icon={<FaAngleDown />} />
            </div>
            {isOpen && (
                <div className="dropdown__content content">
                    {selectOptions}
                </div>
            )}
        </div>
    );
}