import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagerService } from '../user-manager.service';
import { User } from '../user-list/user-list.component';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userManager: UserManagerService,
    private dialogRef: MatDialogRef<AddUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public payload: User) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.payload) {
      this.userForm.patchValue(this.payload);
    }
  }

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  addUser(): void {
    this.userManager.addUser(this.userForm.value)
    .subscribe(user => this.dialogRef.close(user));
  }

  updateUser(): void {
    this.userManager.updateUser(this.payload.id, this.userForm.value)
    .subscribe(user => this.dialogRef.close(user));
  }

}
