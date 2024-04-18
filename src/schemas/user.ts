export type UserType = 'adm' | 'consultant';

export interface UserSchema {
    id: number,
    name: string,
    email: string,
    type: UserType
}

export type UserPostSchema = Omit<UserSchema, 'id'> & {
    password: string
};

export type UserUpdateSchema = Partial<UserSchema>;
