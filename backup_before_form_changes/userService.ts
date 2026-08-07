import type { User } from '../types/user';

export type CreateUserInput = Omit<User, 'id'>;

const STORAGE_KEY = 'mp-chieu-users';

function readUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    return readUsers();
  },

  getUserById: async (id: number | string): Promise<User> => {
    const users = readUsers();
    const user = users.find((item) => String(item.id) === String(id));
    if (!user) throw new Error('User not found');
    return user;
  },

  createUser: async (data: CreateUserInput): Promise<User> => {
    const users = readUsers();
    const user: User = {
      id: String(Date.now()),
      ...data,
    };
    users.push(user);
    writeUsers(users);
    return user;
  },
};
