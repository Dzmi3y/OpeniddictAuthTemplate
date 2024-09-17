export const config = {
    grant_type_password: 'password',
    grant_type_refresh_token: 'refresh_token',
    client_id: 'default-client',
    client_secret: '499D56FA-B47B-5199-BA61-B298D431C318',
    baseApiUrl: 'https://localhost:5001',
}

export enum ApiPathEnum {
    GETTOKEN = '/account/gettoken',
    REGISTER = '/account/register',
    LOGOUT = '/account/logout',
    GETUSERDATA = '/account/getuserdata',
}
