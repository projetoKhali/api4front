import { UserSchema, UserPostSchema, UserUpdateSchema } from '../schemas/user';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function parseUser(user: any): Promise<UserSchema> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profileType,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mapUsers(users: any): Promise<UserSchema[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return users ? await users.map(async (item: any) => parseUser(item)) : [];
}

export async function getUsers(): Promise<UserSchema[]> {
  const response = await axios.get(`${API_URL}/users`);
  return mapUsers(response.data);
}

export async function getUser(id: number): Promise<UserSchema> {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return parseUser(response.data);
}

export async function createUser(user: UserPostSchema): Promise<UserSchema> {
  const response = await axios.post(`${API_URL}/users`, user);
  return parseUser(response.data);
}

export async function updateUser(
  id: number,
  user: UserUpdateSchema,
): Promise<UserSchema> {
  const response = await axios.patch(`${API_URL}/users/${id}`, user);
  return parseUser(response.data);
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${API_URL}/users/${id}`);
}
