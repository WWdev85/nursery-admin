import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Alert, AlertType, Button, ContentWrapper, Input, InputType } from '../../components';
import { get, getFile, post } from '../../functions';
import { UpdateSettingsResponse } from '../../types';
import './Settings.scss';

export const Settings = () => {
    const [appName, setAppName] = useState<string>("");
    const [appUrl, setAppUrl] = useState<string>("");
    const [firstColor, setFirstColor] = useState<string>("");
    const [secondColor, setSecondColor] = useState<string>("");
    const [logoSrc, setLogoSrc] = useState<string>("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [alert, setAlert] = useState<ReactNode>(null)


    const getSettings = useCallback(async () => {
        const response = await get('/settings/get')
        const logo = await getFile('/settings/get-logo')
        setAppName(() => response.appName)
        setAppUrl(() => response.appUrl)
        setFirstColor(() => response.firstColor)
        setSecondColor(() => response.secondColor)
        setLogoSrc(() => logo.url)
    }, [])

    useEffect(() => {
        getSettings()
    }, [getSettings])

    const handleChangeAppName = (value: string) => {
        setAppName(() => value)
    };

    const handleChangeAppUrl = (value: string) => {
        setAppUrl(() => value)
    }

    const handleChangeFirstColor = (value: string) => {
        setFirstColor(() => value)
    }

    const handleChangeSecondColor = (value: string) => {
        setSecondColor(() => value)
    }
    const handleChangeLogoFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
            setLogoFile(file)
        }
    };

    const handleSaveChanges = async () => {
        const file = logoFile ? { label: 'logo', content: logoFile } : undefined
        const response = await post('/settings/update', {
            appName,
            appUrl,
            firstColor,
            secondColor,
        },
            file
        );

        if (response === UpdateSettingsResponse.Success) {
            setAlert(<Alert message={'Ustawienia zostały zapisane'} className={''} type={AlertType.Success} />)
        } else {
            setAlert(<Alert message={'Błąd'} className={''} type={AlertType.Error} />)
        }
    }

    return (
        <div className='settings'>
            {alert}
            <ContentWrapper className={'settings__wrapper settings-wrapper'} title={'Ustawienia'}>
                <Input className={'settings-wrapper__input'} label='Nazwa placówki' value={appName} type={InputType.Text} onChangeFn={handleChangeAppName}></Input>
                <Input className={'settings-wrapper__input'} label='Adres strony' value={appUrl} type={InputType.Text} onChangeFn={handleChangeAppUrl}></Input>
                <Input className={'settings-wrapper__input'} label='Kolor podstawowy' value={firstColor} type={InputType.Color} onChangeFn={handleChangeFirstColor}></Input>
                <Input className={'settings-wrapper__input'} label='Kolor uzupełniający' value={secondColor} type={InputType.Color} onChangeFn={handleChangeSecondColor}></Input>
                <Input className={'settings-wrapper__input-file'} type={InputType.File} label={'Logo'} onChangeFn={handleChangeLogoFile} photo={logoSrc} />
                <Button className={'settings-wrapper__button'} text={'Zapisz'} disabled={false} onClickFn={handleSaveChanges} />
            </ContentWrapper>
        </div>

    )
}