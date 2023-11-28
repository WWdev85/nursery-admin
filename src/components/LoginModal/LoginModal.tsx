import { ReactNode, useContext, useState } from 'react';
import clsx from 'clsx';
import { Background } from '../common';
import './LoginModal.scss';
import { Logo } from '../Logo';
import { SettingsContext } from '../../contexts';
import { Loader } from '../Loader';


interface LoginModalProps {
    title: string,
    children?: ReactNode,
    backgroundImage: string,
}

export const LoginModal = (props: LoginModalProps) => {
    const { logo } = useContext(SettingsContext) || {}
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const { title, children, backgroundImage } = props;

    const loginBackgroundClass = clsx('login-background');
    const loginModalClass = clsx('login-modal');
    const loginModaTitlelClass = clsx('login-modal__title');

    return (
        <>
            <Background className={loginBackgroundClass} image={backgroundImage} />
            <div className={loginModalClass}>
                {!isLoaded && <Loader />}
                <img
                    src={logo?.url}
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => setIsLoaded(true)}
                />
                <div className={'login-modal__header'}>{localStorage.getItem('app-name')}</div>
                <div className={loginModaTitlelClass}>{title}</div>
                {children}
                <Logo logo={logo?.url} />
            </div>

        </>
    );
};