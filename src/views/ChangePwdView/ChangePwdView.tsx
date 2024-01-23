import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RegexPattern, ResetPasswordResponse } from '../../types';
import { Alert, AlertType, Button, Form, Input, InputType, LoginModal } from "../../components"
import background from '../../assets/images/background.png'
import { post, validate } from '../../functions';

export const ChangePwdView = () => {
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const [alert, setAlert] = useState<ReactNode>(null);
    const navigate = useNavigate();
    const { id, code } = useParams();

    useEffect(() => {
        if (validate(password, RegexPattern.Password))
            if (password === repeatedPassword) {
                setIsButtonDisabled(false);
                setAlert(null)
            } else {
                setIsButtonDisabled(true);
                setAlert(<Alert message={"Hasła nie są takie same"} className={'incorrect-login-data'} type={AlertType.Error} />)
            }
    }, [id, code, password, repeatedPassword]);

    const handleChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleChangeRepeatedPassword = (value: string) => {
        setRepeatedPassword(value);
    };

    const toggleVisibility = () => {
        setIsPasswordVisible(() => !isPasswordVisible);
    };

    const handleSubmit = async () => {
        const response = await post('/admin/reset-pwd', {
            id,
            code,
            password,
        })

        if (response === ResetPasswordResponse.Success) {
            setAlert(<Alert message={'Hasło zostało zmienione!'} className={'incorrect-login-data'} type={AlertType.Success} />)
            setTimeout(() => {
                navigate('/login');
            }, 3000)
        } else {
            setAlert(<Alert message={'Coś poszło nie tak'} className={'incorrect-login-data'} type={AlertType.Error} />)
        }
    };
    const validationErrorMessage = `Hasło musi zawwierać:
    - co najmniej 8 znaków,
    - min. 1 wielka litera,
    - min. 1 cyfra,
    - min. 1 znak specjalny.
    `

    const passwordIcon = !isPasswordVisible ? <FaEyeSlash onClick={toggleVisibility} /> : <FaEye onClick={toggleVisibility} />
    return (
        <div className={'login'}>
            <LoginModal title={'Zmiana hasła'} backgroundImage={background}>
                {alert}
                <Form className={'login__form login-form'} onSubmitFn={handleSubmit}>
                    <Input className='login-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} placeholder={'Hasło'} value={password} validationRegex={RegexPattern.Password} icon={passwordIcon} validationErrorMessage={validationErrorMessage} onChangeFn={handleChangePassword} />
                    <Input className='login-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} placeholder={'Powtórz hasło'} value={repeatedPassword} validationRegex={RegexPattern.Password} icon={passwordIcon} validationErrorMessage={validationErrorMessage} onChangeFn={handleChangeRepeatedPassword} />
                    <Button className={'login-form__button'} disabled={isButtonDisabled} type={'submit'} text={'ZMIEŃ HASŁO'} />
                </Form>
                <p className={'login__link'}>Przejdź do ekranu <Link to='/login' className={'link'}>logowania</Link></p>
            </LoginModal>
        </div>
    )
}