import clsx from "clsx";
import { ReactNode } from "react";
import './IconButton.scss';

interface IconButtonProps {
    className: string;
    icon: ReactNode;
    onClickFn?: Function;
    disabled?: boolean;
    id?: string;
}

export const IconButton = (props: IconButtonProps) => {
    const { icon, className, onClickFn, disabled, id } = props;

    const iconButtonClass = clsx(`${className} icon-button`)

    const handleClick = () => {
        if (onClickFn) {
            onClickFn(id);
        }
    }

    return (
        <button className={iconButtonClass} onClick={handleClick} disabled={disabled}>
            {icon}
        </button>
    )
}
