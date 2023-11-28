import clsx from "clsx";
import './ValidatorMessage.scss'


interface ValidatorMessageProps {
    className: string,
    message: string,
};

export const ValidatorMesage = (props: ValidatorMessageProps) => {
    const { className, message } = props;

    const validatorMessageClass = clsx(`${className} validator-message`);
    return (
        <div className={validatorMessageClass}>{`*${message}`}</div>
    );
};