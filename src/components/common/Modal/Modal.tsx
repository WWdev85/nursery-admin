import clsx from "clsx";
import { Background } from "../Background";
import { ReactNode } from "react";

interface ModalProps {
    className: string,
    children: ReactNode,
    backgroundImage?: string,
};

export const Modal = (props: ModalProps) => {
    const { className, children, backgroundImage } = props;
    const modalClass = clsx(`${className} modal`);

    return (
        <div className={modalClass}>
            <Background className={'modal__background'} image={backgroundImage} />
            <div className={'modal__container'}>
                {children}
            </div>
        </div>
    )
};