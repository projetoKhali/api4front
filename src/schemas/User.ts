export type UserType = 'Oracle' | 'PartnerAdmin';

export interface UserSchema {
  id: number;
  name: string;
  login: string;
  profile: UserType;
}

export type UserPostSchema = Omit<UserSchema, 'id'> & {
  password: string;
};

export type UserPatchSchema = Partial<Omit<UserSchema, 'id'>>;
