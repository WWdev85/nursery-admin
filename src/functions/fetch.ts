const baseUrl = process.env.REACT_APP_API_URI;

export enum Method {
    Get = 'GET',
    Post = 'POST',
    Patch = 'PATCH'
};

const init: RequestInit = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

export const post = async (url: string, data: Object) => {
    init.method = Method.Post;
    init.body = JSON.stringify(data);
    const response = await fetch(baseUrl + url, init);
    return response
}