import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interface/user';
import {Login} from '../../interface/login';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User;
  createUserForm: FormGroup;
  check = '';
  login: Login;
  userLogin: User;


  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {
    this.createUserForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        confirmPassword: ['', Validators.required],
      },
      {validator: this.checkPasswords}
    );
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      this.TransferFormDataToUser();
      this.userService.createUser(this.user).subscribe(
        next => {
          this.login = {username: this.createUserForm.get('username').value, password: this.createUserForm.get('password').value};
          console.log(this.login);
          this.userService.userLogin(this.login).subscribe(data => {
              this.userService.userOnline.userName = data.username;
              this.userService.userOnline.jwtToken = data.accessToken;
            },
            error => {
              this.check = 'false';
            });
          this.check = 'true';
        },
        error => {
          this.check = 'false';
        }
      );
    }
  }

  TransferFormDataToUser() {
    this.user = {
      name: this.createUserForm.get('name').value,
      username: this.createUserForm.get('username').value,
      email: this.createUserForm.get('email').value,
      password: this.createUserForm.get('password').value,
      role: ['user']
    };
  }
}
