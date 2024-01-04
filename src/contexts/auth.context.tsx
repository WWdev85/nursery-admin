import { createContext, useContext, useEffect, useState } from "react";
import { AdminRole } from '../types'
import { validateAuthToken } from "../functions";
import { useLocation, useNavigate } from "react-router-dom";

export type AuthContextType = {
    admin: Admin | undefined,
}

interface Admin {
    id: string,
    role: AdminRole
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = { children: JSX.Element };

export const AuthContextProvider = ({ children }: Props) => {
    const [admin, setAdmin] = useState<Admin | undefined>()
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const path = location.pathname

        const getAdminData = async () => {
            const response = await validateAuthToken()
            if (!response) {
                navigate('/login');
            } else {
                setAdmin(response as Admin)
            }
        }
        if (path !== '/login' && path !== '/reset-pwd' && !path.includes('change-pwd/')) {
            getAdminData()
        }
    }, [navigate, location])

    useEffect(() => {

    })

    return (
        <AuthContext.Provider value={{
            admin: admin,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);