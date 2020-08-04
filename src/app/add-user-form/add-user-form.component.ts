import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, State } from '../interfaces';
import { Store } from '@ngrx/store';
import { addUser, updateUser } from '../actions';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
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
    this.store.dispatch(addUser({ user: this.userForm.value }));
  }

  updateUser(): void {
    this.store.dispatch(updateUser({ id: this.payload.id, user: this.userForm.value }));
  }

}
