import { createContext, useEffect, useState } from "react";
import { AdminRole } from '../types'
import { validateAuthToken } from "../functions";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
    admin: Admin | null
    isAdminLogged: boolean,
}

interface Admin {
    id: string,
    role: AdminRole
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = { children: JSX.Element };

export const AuthContextProvider = ({ children }: Props) => {
    const [admin, setAdmin] = useState<Admin | null>(null)
    const [isAdminLogged, setIsAdminLogged] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        const getAdminData = async () => {
            const admin = await validateAuthToken()
            if (admin) {
                setAdmin(() => admin as Admin)
                setIsAdminLogged(true)
            } else {
                setAdmin(() => null)
                setIsAdminLogged(() => false)
                navigate('/login');
            }
        }
        getAdminData()
    }, [navigate])

    return (
        <AuthContext.Provider value={{
            admin: admin,
            isAdminLogged: isAdminLogged,
        }}>
            {children}
        </AuthContext.Provider>
    );
}