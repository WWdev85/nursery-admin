import React, { ReactNode, useEffect, useState } from "react";
import './Alert.scss'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";


interface AlertProps {
    message: string,
    className: string,
    type: AlertType,
}

export enum AlertType {
    Error = "error",
    Success = "success",
    Info = "info"
}

export const Alert = (props: AlertProps) => {
    const { message, className, type } = props
    const [icon, setIcon] = useState<ReactNode | null>(null)

    useEffect(() => {
        switch (type) {
            case AlertType.Success:
                setIcon(<FaCheckCircle className={"alert__icon"} />);
                break;
            case AlertType.Error:
                setIcon(<FaExclamationCircle className={"alert__icon"} />);
                break;
            case AlertType.Info:
                setIcon(<FaInfoCircle className={"alert__icon"} />);
                break;
        }
    }, [type])
    return (
        <div className={`alert ${className} ${type}`}>
            {icon}
            <p className='alert__message'>{message}</p>
        </div>
    )
}