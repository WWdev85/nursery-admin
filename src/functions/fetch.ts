const baseUrl = process.env.REACT_APP_API_URI;

export enum Method {
    Get = 'GET',
    Post = 'POST',
    Patch = 'PATCH',
    Delete = 'DELETE',
};

export type FileObject = {
    label: string;
    content: File | null;
} | undefined

interface FlexibleObject {
    [key: string]: string | Blob | boolean | number | null | undefined;
}



export const post = async (url: string, data: FlexibleObject, file?: FileObject) => {
    const init: RequestInit = {
        credentials: 'include',
    };
    init.method = Method.Post;
    if (file) {
        const formData = new FormData();
        formData.append(file.label, file.content as File);
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (typeof value === 'object' && key === 'address') {
                value = JSON.stringify(value);
            } else if (typeof value === 'boolean') {
                value = value ? "1" : "";
            }
            formData.append(key, value as string | Blob);
        });

        init.body = formData;
    }
    else {
        init.body = JSON.stringify(data);
        init.headers = {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(baseUrl + url, init);
    return await response.json()
}

export const patch = async (url: string, data: FlexibleObject, file?: FileObject) => {
    const init: RequestInit = {
        credentials: 'include',
    };
    if (file) {
        const formData = new FormData();
        formData.append(file.label, file.content as File);
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (typeof value === 'object' && key === 'address') {
                value = JSON.stringify(value);
            } else if (typeof value === 'boolean') {
                value = value ? "1" : "";
            }
            formData.append(key, value as string | Blob);
        });

        init.body = formData;
    }
    else {
        init.body = JSON.stringify(data);
        init.headers = {
            'Content-Type': 'application/json',
        }
    }
    init.method = Method.Patch;

    const response = await fetch(baseUrl + url, init);
    return await response.json()
}

export const get = async (url: string) => {
    const init: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    init.method = Method.Get;
    const response = await fetch(baseUrl + url, init);
    return await response.json()
}

export const getFile = async (url: string) => {
    const init: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    init.method = Method.Get;
    return await fetch(baseUrl + url, init);

}

export const deleteItem = async (url: string) => {
    const init: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    init.method = Method.Delete;
    const response = await fetch(baseUrl + url, init);
    return response
}