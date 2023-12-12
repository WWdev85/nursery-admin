import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { SelectOption } from "../Select";

import './Dropdown.scss';
import { Icon } from "../../Icon";

interface DropdownProps {
    options: SelectOption[];
    value: number,
    onClickFn?: Function;
}

export const Dropdown = (props: DropdownProps) => {
    const { options, value, onClickFn } = props;
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Funkcja wykrywająca czy kliknięcie zostało wykonane poza komponentem
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false); // Deaktywuj, lub wykonaj inną akcję
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef])

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleOptionClick = (value: number) => {
        if (onClickFn) {
            onClickFn(value);
        }
        setIsOpen(false);
    };
    return (
        <div className="dropdown" ref={wrapperRef}>
            <div onClick={toggleOpen} className="dropdown__trigger trigger">
                {value}
                <Icon className="trigger__icon" icon={<FaAngleDown />} />
            </div>
            {isOpen && (
                <div className="dropdown__content content">
                    {options.map((option, index) => (
                        <div className={option.value === value ? 'content__option content__option--selected' : 'content__option'} key={index} onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}