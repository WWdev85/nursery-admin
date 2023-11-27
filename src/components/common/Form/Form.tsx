import React, { ReactNode } from "react";
import clsx from "clsx";
import "./Form.scss";


interface FormProps {
    children: ReactNode,
    onSubmitFn: Function,
    className: String,
    title?: string,
}

export const Form = (props: FormProps) => {
    const { children, onSubmitFn, className, title } = props;
    const formClass = clsx(`${className} form`);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitFn();
    }

    return (
        <form className={formClass} onSubmit={handleSubmit}>
            {title && <h3 className={'form__title'}>{title}</h3>}
            {children}
        </form>
    );
};