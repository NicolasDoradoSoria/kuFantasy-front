export type RegisterDto = {
    username: string;
    mail: string;
    password: string;
    confirmPassword: string;
}

export const createEmptyRegisterInfo = (): RegisterDto => ({
    username: "",
    mail: "",
    password: "",
    confirmPassword: ""
})