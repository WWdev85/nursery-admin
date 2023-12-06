import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa6";
import { SendCodeResponse, RegexPattern } from '../../types';
import { Alert, AlertType, Button, Form, Input, InputType, LoginModal } from "../../components"
import './SendCodeView.scss'
import background from '../../assets/images/background3.png'
import { post, validate } from '../../functions';

export const SendCodeView = () => {
    const [email, setEmail] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [alert, setAlert] = useState<ReactNode>(null)
    const navigate = useNavigate();

    const emailIcon = <FaEnvelope />

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

    const handleSubmit = async () => {
        const response = await post('/admin/send-code', {
            email,
        })

        if (response === SendCodeResponse.Success) {
            navigate('/change-pwd');
        }
        if (response === SendCodeResponse.NotFound) {
            setAlert(<Alert message={"Podany e-mail nie istnieje w naszej bazie danych"} className={'incorrect-login-data'} type={AlertType.Error} />)

        }
    };
    return (
        <div className={'login'}>
            <LoginModal title={'Reset hasła'} backgroundImage={background}>
                {alert}
                <Form className={'login__form login-form'} onSubmitFn={handleSubmit}>
                    <Input className='login-form__input' type={InputType.Email} placeholder={'E-mail'} value={email} validationRegex={RegexPattern.Email} icon={emailIcon} validationErrorMessage={'nieprawidłowy adres e-mail'} onChangeFn={handleChangeEmail} />
                    <Button className={'login-form__button'} disabled={isButtonDisabled} type={'submit'} text={'WYŚLIJ KOD'} />
                </Form>
                <p className={'login__link'}>Przejdź do ekranu <Link to='/login' className={'link'}>logowania</Link></p>
            </LoginModal>
        </div>
    );
};