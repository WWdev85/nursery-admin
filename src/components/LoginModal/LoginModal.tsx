import { ReactNode } from 'react';
import clsx from 'clsx';
import { Background } from '../common';
import './LoginModal.scss';
import { Logo } from '../Logo';


interface LoginModalProps {
    title: string,
    children?: ReactNode,
    backgroundImage: string,
}

export const LoginModal = (props: LoginModalProps) => {

    const { title, children, backgroundImage } = props;

    const loginBackgroundClass = clsx('login-background');
    const loginModalClass = clsx('login-modal');
    const loginModaTitlelClass = clsx('login-modal__title');

    return (
        <>
            <Background className={loginBackgroundClass} image={backgroundImage} />
            <div className={loginModalClass}>

                <div className={'login-modal__header'}>MY NURSERY</div>
                <div className={loginModaTitlelClass}>{title}</div>
                {children}
                <Logo />
            </div>

        </>
    );
};