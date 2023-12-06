import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import { LoginResponse, RegexPattern } from '../../types';
import { Alert, AlertType, Button, Form, Input, InputType, LoginModal } from "../../components"
import './LoginView.scss'
import background from '../../assets/images/background3.png'
import { post, validate } from '../../functions';

export const LoginView = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [alert, setAlert] = useState<ReactNode>(null)
    const navigate = useNavigate();
    const emailIcon = <FaEnvelope />

    useEffect(() => {
        if (validate(email, RegexPattern.Email) && validate(password, RegexPattern.Minimum8Characters)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);


    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleChangePassword = (value: string) => {
        setPassword(value);
    };

    const toggleVisibility = () => {
        setIsPasswordVisible(() => !isPasswordVisible);
    };

    const handleSubmit = async () => {
        const response = await post('/auth/login', {
            email,
            password,
        })
        if (response === LoginResponse.Success) {
            navigate('/');
        } else {
            setAlert(<Alert message={'Nieprawidłowy login lub hasło!'} className={'incorrect-login-data'} type={AlertType.Error} />)
        }
    };

    const passwordIcon = !isPasswordVisible ? <FaEyeSlash onClick={toggleVisibility} /> : <FaEye onClick={toggleVisibility} />
    return (
        <div className={'login'}>
            <LoginModal title={'Logowanie'} backgroundImage={background}>
                {alert}
                <Form className={'login__form login-form'} onSubmitFn={handleSubmit}>
                    <Input className='login-form__input' type={InputType.Email} placeholder={'E-mail'} value={email} validationRegex={RegexPattern.Email} icon={emailIcon} validationErrorMessage={'nieprawidłowy adres e-mail'} onChangeFn={handleChangeEmail} />
                    <Input className='login-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} placeholder={'Hasło'} value={password} validationRegex={RegexPattern.Minimum8Characters} icon={passwordIcon} validationErrorMessage={'hasło musi składać się minimum z 8 znaków'} onChangeFn={handleChangePassword} />
                    <Button className={'login-form__button'} disabled={isButtonDisabled} type={'submit'} text={'ZALOGUJ SIĘ'} />
                </Form>
                <p className={'login__link'}>Nie pamiętasz hasła?  <Link to='/reset-pwd' className={'link'}>Resetuj hasło</Link></p>
            </LoginModal>
        </div>
    );
};