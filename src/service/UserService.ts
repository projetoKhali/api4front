import { UserSchema, UserPostSchema, UserPatchSchema } from '../schemas/User';
import { Page } from '../schemas/Page';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';
const DEFAULT_PAGE_SIZE: number = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseUser(user: any): Promise<UserSchema> {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    profile: user.profileType,
  };
}

export async function mapUsers(users: any): Promise<UserSchema[]> {
  return users
    ? Promise.all(users.map(async (item: any) => await parseUser(item)))
    : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getUsers(
  page?: number,
  size?: number,
): Promise<Page<UserSchema>> {
  const response = await axios.get(
    `${API_URL}/user/list?page=${page || 0}&size=${size || DEFAULT_PAGE_SIZE}`,
  );
  return Page.from<UserSchema>({
    ...response.data,
    content: await mapUsers(response.data.content),
  });
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
): Promise<UserSchema | undefined> {
  // const response = await axios.patch(`${API_URL}/user/edit/${id}`, user);
  if (id < Number.MIN_VALUE) return;
  const response = await axios.post(`${API_URL}/user`, user);
  return parseUser(response.data);
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${API_URL}/user/${id}`);
}
