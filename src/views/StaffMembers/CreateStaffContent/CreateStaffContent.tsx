import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Select, InputType, SelectOption, Checkbox, Textarea, Loader, Alert, AlertType } from "../../../components";
import { Address, CreateStaffResponse, RegexPattern, UpdateStaffResponse } from "../../../types";
import './CreateStaffContent.scss';
import { get, getFile, patch, post, validate } from "../../../functions";


interface CreateStaffFormProps {
    onSubmitFn?: Function,
    id?: string,
}

export const CreateStaffForm = (props: CreateStaffFormProps) => {
    const { id, onSubmitFn } = props;

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [address, setAddress] = useState<Address>({
        street: '',
        town: '',
        postalCode: '',
        houseNumber: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [descripton, setDescription] = useState<string>('');
    const [imageSrc, setImageSrc] = useState<string>("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [alert, setAlert] = useState<ReactNode>(null)


    useEffect(() => {
        if (
            validate(name, RegexPattern.Minimum2Characters)
            && validate(surname, RegexPattern.Minimum2Characters)
            && validate(email, RegexPattern.Email)
            && validate(phone, RegexPattern.PhoneNumber)
            && validate(address.street, RegexPattern.Minimum2Characters)
            && validate(address.houseNumber, RegexPattern.HouseNumber)
            && validate(address.postalCode, RegexPattern.UniversalPostalCode)
            && validate(address.town, RegexPattern.Minimum2Characters)
            && role !== ''
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, name, surname, phone, address, role]);

    const getStaffMember = useCallback(async () => {
        if (id) {
            const stafMember = await get(`/staff/get-one/${id}`);
            const photo = await getFile(`/staff/get-photo/${id}`);
            setName(stafMember.name);
            setSurname(stafMember.surname);
            setEmail(stafMember.email);
            setPhone(stafMember.phone)
            setRole(stafMember.role.id);
            setIsVisible(stafMember.isVisible);
            setDescription(stafMember.description);
            setAddress(stafMember.address);
            setImageSrc(() => photo.url);
            console.log(photo.ok);
            if (photo.ok) {

            } else {
                console.log("sadsadasd")
                setIsLoading(() => false)
            }

        } else {
            setIsLoading(() => false)
        }
    }, [id])

    useEffect(() => {
        getStaffMember()
    }, [getStaffMember])

    const handleChanageName = (name: string) => {
        setName(name)
    }

    const handleChanageSurname = (surname: string) => {
        setSurname(surname)
    }

    const handleChanageEmail = (email: string) => {
        setEmail(email)
    }

    const handleChanagePhone = (phone: string) => {
        setPhone(phone)
    }

    const handleChanageStreet = (street: string) => {
        const adress = {
            ...address,
            street: street,
        }
        setAddress(adress)
    }

    const handleChanageHouseNumber = (houseNumber: string) => {
        const adress = {
            ...address,
            houseNumber,
        }
        setAddress(adress)
    }

    const handleChanagePostalCode = (code: string) => {
        const adress = {
            ...address,
            postalCode: code,
        }
        setAddress(adress)
    }

    const handleChanageTown = (town: string) => {
        const adress = {
            ...address,
            town: town
        }
        setAddress(adress)
    }

    const handleChangeRole = (option: SelectOption) => {
        setRole(option.value as string)
    }

    const handleChanageIsVisible = (isVisible: boolean) => {
        setIsVisible(isVisible)
    }

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
            setPhotoFile(file)
        }
    };

    const handleChangeDescription = (description: string) => {
        setDescription(description)
    }

    const handleSubmit = async () => {
        const file = photoFile ? { label: 'photo', content: photoFile } : undefined
        const staff = {
            name: name,
            surname: surname,
            address: JSON.stringify(address),
            email: email,
            phone: phone,
            roleId: role,
            description: descripton,
            isVisible: isVisible,
        }

        if (id) {
            const response = await patch(
                '/staff/update',
                {
                    id: id,
                    ...staff
                },
                file,
            )
            if (response === UpdateStaffResponse.Success) {
                setAlert(() => <Alert message={"Dane pracownika zostały zapisane."} className={""} type={AlertType.Success} />)
                if (onSubmitFn) {
                    onSubmitFn()
                }

            } else {
                setAlert(() => <Alert message={response.message === UpdateStaffResponse.Duplicated ? "Podany adres e-mail istnieje już w bazie." : "Błąd serwera."} className={""} type={AlertType.Error} />)
            }
        } else {
            const response = await post(
                '/staff/add',
                staff,
                file,
            )
            console.log(response.message)
            if (response === CreateStaffResponse.Success) {
                setAlert(() => <Alert message={"Nowy pracownik został zapisany."} className={""} type={AlertType.Success} />)
                if (onSubmitFn) {
                    onSubmitFn()
                }
            }
            else {
                setAlert(() => <Alert message={response.message === CreateStaffResponse.Duplicated ? "Podany adres e-mail istnieje już w bazie." : "Błąd serwera."} className={""} type={AlertType.Error} />)
            }
        }
        setTimeout(() => {
            setAlert(null)
        }, 3000)
    }

    return (

        <Form onSubmitFn={handleSubmit} className={'staff-form'}>
            {alert}
            {/* <Alert message={"sdsadasdsd"} className={""} type={AlertType.Error} /> */}
            {isLoading && <Loader />}
            <img
                src={imageSrc}
                alt=""
                style={{ display: 'none' }}
                onLoad={() => setIsLoading(() => false)}
            />
            <Input className={"staff-form__input"} type={InputType.Text} value={name} label={'*Imię'} validationRegex={RegexPattern.Minimum2Characters} validationErrorMessage={'imię musi składać się z minimum 2 znaków'} onChangeFn={handleChanageName} />
            <Input className={"staff-form__input"} type={InputType.Text} value={surname} label={'*Nazwisko'} validationRegex={RegexPattern.Minimum2Characters} validationErrorMessage={'nazwisko musi składać się z minimum 2 znaków'} onChangeFn={handleChanageSurname} />
            <Input className={"staff-form__input"} type={InputType.Text} value={email} label={'*E-mail'} validationRegex={RegexPattern.Email} validationErrorMessage={'nieprawidłowy adres e-mail'} onChangeFn={handleChanageEmail} />
            <Input className={"staff-form__input"} type={InputType.Text} value={phone} label={'*Numer Telefonu'} validationRegex={RegexPattern.PhoneNumber} validationErrorMessage={'nieprawidłowy numer telefonu'} onChangeFn={handleChanagePhone} />
            <Input className={"staff-form__input"} type={InputType.Text} value={address.street} label={'*Ulica'} validationRegex={RegexPattern.Minimum2Characters} validationErrorMessage={'ulica musi składać się z minimum 2 znaków'} onChangeFn={handleChanageStreet} />
            <Input className={"staff-form__input"} type={InputType.Text} value={address.houseNumber} label={'*Numer domu'} validationRegex={RegexPattern.HouseNumber} validationErrorMessage={'nieprawidłowy numer domu'} onChangeFn={handleChanageHouseNumber} />
            <Input className={"staff-form__input"} type={InputType.Text} value={address.postalCode} label={'*Kod pocztowy'} validationRegex={RegexPattern.UniversalPostalCode} validationErrorMessage={'nieprawidłowy kod pocztowy'} onChangeFn={handleChanagePostalCode} />
            <Input className={"staff-form__input"} type={InputType.Text} value={address.town} label={'*Miejscowość'} validationRegex={RegexPattern.Minimum2Characters} validationErrorMessage={'miejscowość musi składać się z minimum 2 znaków'} onChangeFn={handleChanageTown} />
            <Select className={"staff-form__select"} selected={role} label="*Rola" searchInput={true} options={'/role/get-all'} onChangeFn={handleChangeRole} />
            <Checkbox className={"staff-form__input"} label={'Widoczność'} text={"Widoczny na stronie."} onChangeFn={handleChanageIsVisible} checked={isVisible} />
            <Textarea className="staff-form__input" value={descripton} label={'Opis'} onChangeFn={handleChangeDescription} />
            <Input className={"staff-form__input"} type={InputType.File} label={'Zdjęcie'} onChangeFn={handleChangePhoto} photo={imageSrc} />
            <Button className={"staff-form__button"} text={"Zapisz"} disabled={isButtonDisabled}></Button>
        </Form>
    )

}