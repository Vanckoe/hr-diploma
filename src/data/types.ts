
export interface UserRegisterData {
    full_name: string;
    password: string;
    phone_number: number;
    created_at: string;
    user_pic: string;
}

export interface User extends UserRegisterData {
    id: string;
}
export interface IRegistrationForm {
    name: string;
    phone: string;
    password: string;
    confirmPassword: string;
}