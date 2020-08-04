import { DataSource } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../interfaces';


export class UsersDataSource extends DataSource<User> {

  constructor(private store: Store<{ users: User[] }>) {
    super();
  }

  connect(): Observable<User[]> {
    return this.store.pipe(select('users'));
  }

  disconnect(): void {}
}
