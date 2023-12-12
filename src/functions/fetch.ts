const baseUrl = process.env.REACT_APP_API_URI;

export enum Method {
    Get = 'GET',
    Post = 'POST',
    Patch = 'PATCH'
};



export const post = async (url: string, data: Object) => {
    const init: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    init.method = Method.Post;
    init.body = JSON.stringify(data);
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