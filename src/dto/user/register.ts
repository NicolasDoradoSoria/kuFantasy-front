export type RegisterDto = {
    name: string;
    lastName: string;
    mail: string;
    rawPassword: string;
    
}

export const createEmptyRegisterInfo = (): RegisterDto => ({
    name: "",
    lastName: "",
    mail: "",
    rawPassword: ""
})