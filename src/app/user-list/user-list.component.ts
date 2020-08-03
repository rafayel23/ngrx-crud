import {Component, OnInit, ViewChild} from '@angular/core';
import { UserManagerService } from '../user-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';

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

  @ViewChild(MatTable)
  table: MatTable<UserResponse>;

  openUserForm(payload = null): void {
    this.dialog.open(AddUserFormComponent, {
      disableClose: true,
      data: payload,
    })
    .afterClosed()
    .subscribe(user => {
      if ('id' in user) {
        const targetUser = this.dataSource.data.find(({id}) => user.id === id);
        Object.assign(targetUser, user);
      } else {
        this.dataSource.data.push(user);
      }
      this.table.renderRows();
    });
  }

  removeUser(user): void {
    this.userManager.deleteUser(user.id)
    .subscribe(() => {
      const targetIndex = this.dataSource.data.indexOf(user);
      this.dataSource.data.splice(targetIndex, 1);
      this.table.renderRows();
    });
  }

  ngOnInit(): void {
    this.userManager.getUsers()
    .subscribe(users => this.dataSource.data = users);
  }

}
