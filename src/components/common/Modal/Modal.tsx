import clsx from "clsx";
import { Background } from "../Background";
import { ReactNode } from "react";
import './Modal.scss';
import { FaRegCircleXmark } from "react-icons/fa6";
import { Icon } from "../Icon";

interface ModalProps {
    className: string,
    children: ReactNode,
    backgroundImage?: string,
    title: string,
    closeFn: Function,
};

export const Modal = (props: ModalProps) => {
    const { className, children, backgroundImage, title, closeFn } = props;
    const modalClass = clsx(`${className} modal`);


    const handleCloseModal = () => {
        closeFn()
    }


    return (
        <div className={modalClass}>
            <Background className={'modal__background'} image={backgroundImage} />
            <div className={'modal__container container'}>
                <div className={'container__header'}>
                    {title}
                    <Icon icon={<FaRegCircleXmark />} onClickFn={handleCloseModal} />
                </div>
                <div className="container__content">
                    {children}
                </div>
            </div>
        </div>
    )
};