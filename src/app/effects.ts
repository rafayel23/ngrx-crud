import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { UserManagerService } from './user-manager.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType('LOAD_USERS'),
    mergeMap(() => this.userManager.getUsers()
      .pipe(
        map(users => ({ type: 'LOAD_USERS_SUCCESS', users })),
        catchError(({error}) => of({type: 'LOAD_USERS_FAILURE', error}))
      ))
    )
  );

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType('ADD_USER'),
    mergeMap(({user}) => this.userManager.addUser(user)
      .pipe(
        map(res => ({ type: 'ADD_USER_SUCCESS', user: res })),
        catchError(({error}) => of({type: 'ADD_USER_FAILURE', error}))
      ))
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType('DELETE_USER'),
    mergeMap(({id}) => this.userManager.deleteUser(id)
      .pipe(
        map(() => ({ type: 'DELETE_USER_SUCCESS', id })),
        catchError(({error}) => of({type: 'DELETE_USER_FAILURE', error}))
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType('UPDATE_USER'),
    mergeMap(({id, user}) => this.userManager.updateUser(id, user)
      .pipe(
        map((res) => ({ type: 'UPDATE_USER_SUCCESS', user: res })),
        catchError(({error}) => of({type: 'UPDATE_USER_FAILURE', error}))
      ))
    )
  );

  resetError$ = createEffect(() => this.actions$.pipe(
    ofType('LOAD_USERS_FAILURE', 'ADD_USER_FAILURE', 'DELETE_USER_FAILURE', 'UPDATE_USER_FAILURE'),
    delay(4000),
    mergeMap(() => of({type: 'RESET_ERROR'}))
  ));

  constructor(
    private actions$: Actions,
    private userManager: UserManagerService
  ) {}
}
