import React, { ReactNode } from "react";
import "./ContentWrapper.scss";
import clsx from "clsx";
import { Header } from "../Header";


interface ContentWrapperProps {
    children: ReactNode,
    className?: String,
    title?: string,
}

export const ContentWrapper = (props: ContentWrapperProps) => {
    const { children, className, title } = props;
    const formClass = clsx(`${className} content-wrapper`);


    return (
        <>
            {title && <Header title={title} />}
            <div className={formClass}>
                {children}
            </div>
        </>
    );
};