import {Component, OnInit} from '@angular/core';
import { UserManagerService } from '../user-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatTableDataSource } from '@angular/material/table';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface UserRequest {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

  constructor(
    private userManager: UserManagerService,
    private dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();

  openUserForm(payload = null): void {
    this.dialog.open(AddUserFormComponent, {
      disableClose: true,
      data: payload,
    })
    .afterClosed()
    .subscribe(user => {
      // Don't know why but dataSource is not dynamic
      // for example datasource.data.push(...) doesn't work
      const { data } = this.dataSource;
      const userIndex = data.findIndex(({id}) => id === user.id);
      if (userIndex !== -1) {
        data[userIndex] = user;
      } else {
        data.push(user);
      }
      this.dataSource.data = data;
    });
  }

  removeUser(user): void {
    this.userManager.deleteUser(user.id)
    .subscribe(() => {
      const { data } = this.dataSource;
      data.splice(data.indexOf(user), 1);
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    this.userManager.getUsers()
    .subscribe(users => this.dataSource.data = users);
  }

}
