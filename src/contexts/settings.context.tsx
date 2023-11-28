import { createContext, useEffect, useState } from "react";
import { get, getFile } from "../functions/fetch";
import { GetSettingsResponse } from '../types';

export type SettingsContextType = {
    settings: GetSettingsResponse;
    logo: Response | undefined;
};

export const SettingsContext = createContext<SettingsContextType | null>(null)

type Props = { children: JSX.Element };

export const SettingsContextProvider = ({ children }: Props) => {
    const [settings, setSettings] = useState<GetSettingsResponse>(null);
    const [logo, setLogo] = useState<Response>();

    useEffect(() => {
        const getSettings = async () => {
            const settings = await get('/settings/get')
            const logo = await getFile('/settings/get-logo')
            localStorage.setItem("app-name", settings.appName);
            setSettings(settings)
            setLogo(logo)
        }
        getSettings()

    }, [])


    return (
        <SettingsContext.Provider value={{
            settings: settings,
            logo: logo
        }}>
            {children}
        </SettingsContext.Provider>
    )
}