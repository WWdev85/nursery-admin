import React from "react";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { RegexPattern } from "../../../types";
import './Input.scss'
import { ValidatorMesage } from "../ValidatorMessage";
import { validate } from "../../../functions";


export enum InputType {
    Text = 'text',
    Password = 'password',
    Date = 'date',
    Email = 'email',
    Color = 'color',
    File = 'file'
}

interface InputProps {
    className: string,
    type: InputType,
    placeholder?: string,
    value: string,
    validationRegex?: RegexPattern,
    icon?: ReactElement,
    onChangeFn: Function,
    validationErrorMessage?: string,
    label?: string,

}

export const Input = (props: InputProps) => {
    const { className, type, value, placeholder, label, validationRegex, icon, onChangeFn, validationErrorMessage } = props;

    const [isCorrect, setIsCorrect] = useState<boolean>(true)

    const inputClass = clsx(`${className} input`);
    const inputFieldClass = clsx('input__field field field',
        !isCorrect && 'field--validation-error',
        icon && 'field--icon',
    );


    const iconWithClass = icon ? React.cloneElement(icon, { className: "field__icon" }) : null;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (validationRegex) {
            setIsCorrect(validate(value, validationRegex))
        }
        onChangeFn(value)
    }

    return (
        <div className={inputClass}>
            {label && <label className={'input__label'}>{label}</label>}
            <div className={inputFieldClass}>
                {iconWithClass}
                <input className={'field__content'} type={type} value={value} placeholder={placeholder} onChange={handleChange} />
            </div>
            {!isCorrect && validationErrorMessage && <ValidatorMesage className={'input__validation-error'} message={validationErrorMessage} />}
        </div>

    )
}