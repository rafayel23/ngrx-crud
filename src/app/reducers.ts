import { Action, createReducer, on } from '@ngrx/store';
import { User } from './interfaces';
import {
  loadUsersSuccess,
  addUserSuccess,
  deleteUserSuccess,
  updateUserSuccess,
  loadUsersFailure,
  addUserFailure,
  deleteUserFailure,
  updateUserFailure,
  resetError
} from './actions';

const _usersReducer = createReducer(
  [],
  on(loadUsersSuccess, (_, {users}) => users),
  on(addUserSuccess, (state, {user}) => [...state, user]),
  on(deleteUserSuccess, (state, {id}) => state.filter(user => user.id !== id)),
  on(updateUserSuccess, (state, {user}) => {
    const copy = state.slice();
    const targetIndex = copy.findIndex(currentUser => currentUser.id === user.id);
    copy.splice(targetIndex, 1, user);
    return copy;
  }),
);

const _errorMessageReducer = createReducer(
  '',
  on(loadUsersFailure, addUserFailure, deleteUserFailure, updateUserFailure, (_, {error}) => error),
  on(resetError, () => '')
);

export function usersReducer(state: User[], action: Action): User[] {
  return _usersReducer(state, action);
}

export function errorMessageReducer(state: string, action: Action): string {
  return _errorMessageReducer(state, action);
}
