import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import { LoginResponse, RegexPattern } from 'types'
import { Button, Form, Input, InputType, Loader, LoginModal } from "../../components"
import './LoginView.scss'
import background from '../../assets/images/background.png'
import { post, validate } from '../../functions';



export const LoginView = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

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

    const handleSubmit = () => {
        console.log("logowanie")
        const response = post('/auth/login', {
            email: email,
            password: password,
        })
        console.log(response)
    };

    const passwordIcon = !isPasswordVisible ? <FaEyeSlash onClick={toggleVisibility} /> : <FaEye onClick={toggleVisibility} />
    return (
        <div className={'login'}>
            <LoginModal title={'Logowanie'} backgroundImage={background}>
                <Form className={'login__form login-form'} onSubmitFn={handleSubmit}>
                    <Input className='login-form__input' type={InputType.Email} placeholder={'E-mail'} value={email} validationRegex={RegexPattern.Email} icon={emailIcon} validationErrorMessage={'nieprawidłowy adres e-mail'} onChangeFn={handleChangeEmail} />
                    <Input className='login-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} placeholder={'Hasło'} value={password} validationRegex={RegexPattern.Minimum8Characters} icon={passwordIcon} validationErrorMessage={'hasło musi składać się minimum z 8 znaków'} onChangeFn={handleChangePassword} />
                    <Button className={'login-form__button'} disabled={isButtonDisabled} type={'submit'} text={'ZALOGUJ SIĘ'} onClickFn={handleSubmit} />
                </Form>
                <p className={"login__link"}>Nie pamiętasz hasła?  <Link to="/" className={"link"}>Resetuj hasło</Link></p>
            </LoginModal>
        </div>

        //<div>LoginView</div>
    );
};