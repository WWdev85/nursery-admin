import React, { useEffect, useRef } from "react";
import { ReactElement, useState } from "react";
import clsx from "clsx";
import { RegexPattern } from "../../../types";
import './Input.scss'
import { ValidatorMesage } from "../ValidatorMessage";
import { validate } from "../../../functions";
import { Button } from "../Button";


export enum InputType {
    Text = 'text',
    Password = 'password',
    Date = 'date',
    Email = 'email',
    Color = 'color',
    File = 'file',
    Number = 'number',
}

interface InputProps {
    className: string,
    type: InputType,
    placeholder?: string,
    value?: string | number,
    validationRegex?: RegexPattern | string,
    icon?: ReactElement,
    onChangeFn: Function,
    validationErrorMessage?: string,
    label?: string,
    disabled?: boolean,
    photo?: string,
    min?: number,

}

export const Input = (props: InputProps) => {
    const { className, type, value, placeholder, label, validationRegex, icon, onChangeFn, validationErrorMessage, disabled, photo, min } = props;

    const [isCorrect, setIsCorrect] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

    const inputClass = clsx(`${className} input`);
    const inputFieldClass = clsx('input__field field',
        !isCorrect && 'field--validation-error',
        icon && 'field--icon',
        type === InputType.File && 'field--file',
        type === InputType.Color && 'field--color'
    );


    const iconWithClass = icon ? React.cloneElement(icon, { className: "field__icon" }) : null;

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: React.ChangeEvent<HTMLInputElement> | string
        if (type === InputType.File) {
            value = e
        } else {
            value = e.target.value
            if (validationRegex) {
                setIsCorrect(validate(value, validationRegex))
            }
        }
        onChangeFn(value)
    }

    const triggerFileInput = () => {
        if (fileInputRef?.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className={inputClass} ref={inputRef}>
            {label && <label className={'input__label'}>{label}</label>}
            {type === InputType.File ?
                <>
                    <div className={"input__photo"} style={{ backgroundImage: `url(${photo})` }}></div>
                    <Button className={"input__file-button"} type={"button"} text={"Wybierz plik"} disabled={false} onClickFn={triggerFileInput} />
                </>
                : null}
            <div className={inputFieldClass}>
                {iconWithClass}
                <input className={`field__content field__content--${type}`} type={type} min={min} value={value} placeholder={placeholder} onChange={handleChange} disabled={disabled} ref={fileInputRef} />
            </div>
            {!isCorrect && validationErrorMessage && <ValidatorMesage className={'input__validation-error'} message={validationErrorMessage} />}
        </div>

    )
}