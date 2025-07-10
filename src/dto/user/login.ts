export type LoginDTO = {
    mail: string
    password : string
}

export const createEmptyLoginInfo = () : LoginDTO => {
    return {
        mail : '',
        password : ''
    }
}