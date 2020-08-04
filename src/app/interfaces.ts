export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface State {
  users: User[];
  error: string;
}
