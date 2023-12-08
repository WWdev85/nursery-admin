import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaKey } from "react-icons/fa6";
import { SendCodeResponse, RegexPattern, ValidateCodeResponse } from '../../types';
import { Alert, AlertType, Button, Form, Input, InputType, LoginModal } from "../../components"
import './SendCodeView.scss'
import background from '../../assets/images/background3.png'
import { post, validate } from '../../functions';

export const SendCodeView = () => {
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [isCodeRecieved, setIsCodeRecieved] = useState<boolean>(false);
    const [alert, setAlert] = useState<ReactNode>(null)
    const navigate = useNavigate();

    const emailIcon = <FaEnvelope />
    const codeIcon = <FaKey />

    useEffect(() => {
        if (validate(email, RegexPattern.Email)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email]);

    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleChangeCode = (value: string) => {
        setCode(value);
    };


    const handleSubmit = async () => {
        if (isCodeRecieved) {
            const id = await post('/admin/validate-code', {
                email,
                code,
            })
            if (id !== ValidateCodeResponse.Failure) {
                navigate(`/change-pwd/${id}/${code}`);
            } else {
                setAlert(<Alert message={'Nieprawidłowy kod'} className={'incorrect-login-data'} type={AlertType.Error} />)
            }

        } else {
            const response = await post('/admin/send-code', {
                email,
            })
            if (response === SendCodeResponse.Success) {
                setIsCodeRecieved(true);
            }
            if (response === SendCodeResponse.NotFound) {
                setAlert(<Alert message={'Podany e-mail nie istnieje w naszej bazie danych'} className={'incorrect-login-data'} type={AlertType.Error} />)
            }
        }

    };

    return (
        <div className={'login'}>
            <LoginModal title={'Reset hasła'} backgroundImage={background}>
                {alert}
                <Form className={'login__form login-form'} onSubmitFn={handleSubmit}>
                    <Input className='login-form__input' type={InputType.Email} placeholder={'E-mail'} value={email} validationRegex={RegexPattern.Email} icon={emailIcon} validationErrorMessage={'nieprawidłowy adres e-mail'} onChangeFn={handleChangeEmail} disabled={isCodeRecieved} />
                    {isCodeRecieved && <Input className='login-form__input' type={InputType.Text} placeholder={'Kod weryfikacyjny'} value={code} icon={codeIcon} onChangeFn={handleChangeCode} />}
                    <Button className={'login-form__button'} disabled={isButtonDisabled} type={'submit'} text={!isCodeRecieved ? 'WYŚLIJ KOD' : 'ZMIEŃ HASŁO'} />
                </Form>
                <p className={'login__link'}>Przejdź do ekranu <Link to='/login' className={'link'}>logowania</Link></p>
            </LoginModal>
        </div>
    );
};