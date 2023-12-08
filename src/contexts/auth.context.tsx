import { createContext, useCallback, useEffect, useState } from "react";
import { AdminRole } from 'types'
import { get } from "../functions";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
    admin: Admin | null
    isAdminLogged: boolean,
    validateAuthToken: Function,
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

    const validateAuthToken = useCallback(async () => {
        const response = await get('/auth/check')
        // const response = await fetchData({
        //     url: '/auth/check',
        //     method: Method.Get
        // })S
        if (response.message !== 'Unauthorized') {
            setAdmin(() => {
                return {
                    id: response.id,
                    role: response.role
                }
            })
            setIsAdminLogged(() => true)
        } else {
            setAdmin(() => null)
            setIsAdminLogged(() => false)
            navigate('/login');
        }
    }, [])

    useEffect(() => {
        validateAuthToken().then()
    }, [validateAuthToken])

    return (
        <AuthContext.Provider value={{
            admin: admin,
            isAdminLogged: isAdminLogged,
            validateAuthToken: validateAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}