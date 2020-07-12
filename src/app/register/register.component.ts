import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ERole } from '../_interfaces/role.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: User;
  isSuccessful = false;
  isSignUpFailed = false;
  isUserUpdate = false;
  errorMessage = '';

  roleEnum = ERole;
  roles = [];
  selectedRole: string;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.user = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras.state.data));
    }

    if (this.user) {
      this.isUserUpdate = true;
    }
  }

  ngOnInit() {
    this.roles = Object.keys(this.roleEnum);

    this.form = this.formBuilder.group({
      username: [this.isUserUpdate ? this.user.username : '', Validators.required],
      email: [this.isUserUpdate ? this.user.email : '', Validators.required],
      password: ['', Validators.required],
      role: [this.isUserUpdate ? this.user.role : '', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value)

    if (!this.isUserUpdate) {
      this.userService.register(this.form.value).subscribe(
        data => {
          this.handleSuccess(data);
        },
        err => {
          this.handleError(err);
        }
      );
    } else {
      this.userService.update(this.form.value, this.user.id).subscribe(
        data => {
          this.handleSuccess(data);
        },
        err => {
          this.handleError(err);
        }
      );
    }
  }

  private handleSuccess(data) {
    console.log(data);
    this.isSuccessful = true;
    this.isSignUpFailed = false;
  }

  private handleError(err) {
    this.errorMessage = err.error.message;
    this.isSignUpFailed = true;
  }
}
