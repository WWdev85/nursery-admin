import clsx from "clsx";
import "./Button.scss";

export interface ButtonProps {
    className: string;
    text: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled: boolean,
    onClickFn?: Function
}

export const Button = (props: ButtonProps) => {
    const { type, text, className, disabled, onClickFn } = props
    const buttonClass = clsx(`${className} button`);

    const handleClick = () => {
        if (onClickFn) {
            onClickFn()
        }
    }

    return (
        <div className={buttonClass}>
            <button className="button__pressable" disabled={disabled} type={type} onClick={handleClick}>{text}</button>
        </div>
    )
}