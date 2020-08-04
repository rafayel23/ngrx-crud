import { createAction, props } from '@ngrx/store';
import { User } from './interfaces';

export const loadUsers = createAction('LOAD_USERS');
export const loadUsersSuccess = createAction('LOAD_USERS_SUCCESS', props<{users: User[]}>());
export const loadUsersFailure = createAction('LOAD_USERS_FAILURE', props<{error: string}>());

export const addUser = createAction('ADD_USER', props<{user: User}>());
export const addUserSuccess = createAction('ADD_USER_SUCCESS', props<{user: User}>());
export const addUserFailure = createAction('ADD_USER_FAILURE', props<{error: string}>());

export const deleteUser = createAction('DELETE_USER', props<{id: string}>());
export const deleteUserSuccess = createAction('DELETE_USER_SUCCESS', props<{id: string}>());
export const deleteUserFailure = createAction('DELETE_USER_FAILURE', props<{error: string}>());

export const updateUser = createAction('UPDATE_USER', props<{id: string, user: User}>());
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS', props<{user: User}>());
export const updateUserFailure = createAction('UPDATE_USER_FAILURE', props<{error: string}>());

export const resetError = createAction('RESET_ERROR');
