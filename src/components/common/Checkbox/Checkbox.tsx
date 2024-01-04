import './Checkbox.scss'
import React from "react";

interface CheckboxProps {
    className: string;
    label?: string;
    text: string;
    onChangeFn: Function;
    checked: boolean;
}

export const Checkbox = (props: CheckboxProps) => {

    const { className, text, label, checked, onChangeFn } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFn(e.target.checked)
    }

    return (
        <div className={`checkbox ${className}`}>
            {label && <label className={'checkbox__label'}>{label}</label>}
            <input className={'checkbox__input'} checked={checked} type="checkbox" id={text} value="yes" onChange={handleChange} />
            <label className={'checkbox__text'} htmlFor={text}>{text}</label>
        </div>

    )
}