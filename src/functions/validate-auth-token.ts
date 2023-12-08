import { get } from "./fetch";

interface Admin {
    id: string;
    role: string;
}

export const validateAuthToken = async (): Promise<Admin | undefined> => {
    const response = await get('/auth/check');
    if (response.message !== 'Unauthorized') {
        return {
            id: response.id,
            role: response.role
        };
    };
};

