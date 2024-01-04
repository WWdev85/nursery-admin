import { ReactNode, useEffect, useState } from "react"
import { Alert, AlertType, Button, Form, Input, InputType } from "../../.."
import { RegexPattern, UpdatePasswordResponse } from "../../../../types"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import './ChangePwd.scss'
import { patch, validate } from "../../../../functions"

interface ChangePwdProps {
    onSubmitFn?: Function,
}

export const ChangePwd = (props: ChangePwdProps) => {
    const { onSubmitFn } = props
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const [alert, setAlert] = useState<ReactNode>(null)

    const toggleVisibility = () => {
        setIsPasswordVisible(() => !isPasswordVisible);
    };

    const handleChangeOldPassword = (value: string) => {
        setOldPassword(value)
    }

    const handleChangeNewPassword = (value: string) => {
        setNewPassword(value)
    }

    const handleChangeRepeatPassword = (value: string) => {
        setRepeatPassword(value)
    }

    const handleSubmit = async () => {
        const response = await patch('/admin/change-pwd',
            {
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        if (response === UpdatePasswordResponse.Success) {
            setAlert(() => <Alert message={"Hasło zostało zmienione"} className={""} type={AlertType.Success} />)
            clearPasswordInputs()
            if (onSubmitFn) {
                onSubmitFn()
            }
        } else {
            setAlert(() => <Alert message={"Nieprawidłowe dane!"} className={""} type={AlertType.Error} />)
            clearPasswordInputs()
        }

        setTimeout(() => {
            setAlert(null)
        }, 3000)
    }

    const clearPasswordInputs = () => {
        setOldPassword("")
        setNewPassword("")
        setRepeatPassword("")
    }

    const validationErrorMessage = `Hasło musi zawwierać:
    - co najmniej 8 znaków,
    - min. 1 wielka litera,
    - min. 1 cyfra,
    - min. 1 znak specjalny.
    `

    useEffect(() => {
        if (
            validate(oldPassword, RegexPattern.Password)
            && validate(newPassword, RegexPattern.Password)
            && validate(repeatPassword, RegexPattern.Password)
            && newPassword === repeatPassword
        ) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [oldPassword, newPassword, repeatPassword])

    const passwordIcon = !isPasswordVisible ? <FaEyeSlash onClick={toggleVisibility} /> : <FaEye onClick={toggleVisibility} />
    return (
        <div className="change-pwd">
            {alert}
            <Form className={'change-pwd__form change-pwd-form'} onSubmitFn={handleSubmit}>
                <Input className='change-pwd-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} label={'Stare hasło'} value={oldPassword} validationRegex={RegexPattern.Password} icon={passwordIcon} validationErrorMessage={validationErrorMessage} onChangeFn={handleChangeOldPassword} />
                <Input className='change-pwd-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} label={'Nowe hasło'} value={newPassword} validationRegex={RegexPattern.Password} icon={passwordIcon} validationErrorMessage={validationErrorMessage} onChangeFn={handleChangeNewPassword} />
                <Input className='change-pwd-form__input' type={isPasswordVisible ? InputType.Text : InputType.Password} label={'Powtórz nowe hasło'} value={repeatPassword} validationRegex={newPassword} icon={passwordIcon} validationErrorMessage={'Hasło nie jest takie samo'} onChangeFn={handleChangeRepeatPassword} />
                <Button className={'change-pwd-form__button'} disabled={isButtonDisabled} type={'submit'} text={'Zmień hasło'} />
            </Form>

        </div >
    )
}