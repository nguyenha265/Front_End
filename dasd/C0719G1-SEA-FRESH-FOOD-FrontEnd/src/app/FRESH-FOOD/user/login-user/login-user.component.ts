import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  check = '';

  constructor(private fb: FormBuilder, private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      }
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.userLogin(this.loginForm.value).subscribe(next => {
          this.userService.userOnline.userName = next.username;
          this.userService.userOnline.jwtToken = next.accessToken;
          console.log(next.username + 'next');
          this.check = 'true';
        },
        error => {
          this.check = 'false';
        });
    }
  }
}
