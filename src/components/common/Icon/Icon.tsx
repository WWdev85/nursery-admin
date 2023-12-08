import clsx from "clsx";
import { ReactNode } from "react";
import './Icon.scss';

interface IconProps {
    icon: ReactNode;
    className?: string;
    onClickFn?: Function;
}

export const Icon = (props: IconProps) => {
    const { icon, className, onClickFn } = props;
    const iconlass = clsx(`${className} icon`);

    const handleClick = () => {
        if (onClickFn) {
            onClickFn();
        }
    }

    return (
        <div className={iconlass} onClick={handleClick}>
            {icon}
        </div>
    )

}