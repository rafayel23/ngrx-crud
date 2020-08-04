import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { State } from '../interfaces';
import { UsersDataSource } from './data-source';
import { Store, select } from '@ngrx/store';
import { loadUsers, deleteUser } from '../actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private dialog: MatDialog) {}

  displayedColumns: string[];
  dataSource: UsersDataSource;
  errMessage: Observable<string>;

  openUserForm(payload = null): void {
    this.dialog.open(AddUserFormComponent, {
      disableClose: true,
      data: payload,
    });
  }

  removeUser(id: string): void {
    this.store.dispatch(deleteUser({id}));
  }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email', 'actions'];
    this.dataSource = new UsersDataSource(this.store);
    this.errMessage = this.store.pipe(select('error'));

    this.store.dispatch(loadUsers());
  }

}
