import { UserSchema, UserPostSchema, UserPatchSchema } from '../schemas/User';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseUser(user: any): Promise<UserSchema> {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    profileType: user.profileType,
  };
}

export async function mapUsers(user: any): Promise<UserSchema[]> {
  return user ? await user.map(async (item: any) => parseUser(item)) : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getUsers(): Promise<UserSchema[]> {
  const response = await axios.get(`${API_URL}/user`);
  return mapUsers(response.data);
}

export async function getUser(id: number): Promise<UserSchema> {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return parseUser(response.data);
}

export async function createUser(user: UserPostSchema): Promise<UserSchema> {
  const response = await axios.post(`${API_URL}/user`, user);
  return parseUser(response.data);
}

export async function updateUser(
  id: number,
  user: UserPatchSchema,
): Promise<UserSchema> {
  const response = await axios.patch(`${API_URL}/user/edit/${id}`, user);
  return parseUser(response.data);
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${API_URL}/user/${id}`);
}
