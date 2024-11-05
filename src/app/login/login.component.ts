import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginValue } from '../loginValue.model';
import { AuthenticationService } from '../authentication.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //services
  authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router)

  //password hide and see feature
  passwordUnseenMode = true;
  SeePassword(passwordInputField: HTMLInputElement) {
    this.passwordUnseenMode = false;
    passwordInputField.type = 'text';
  }
  hidePassword(passwordInputField: HTMLInputElement) {
    this.passwordUnseenMode = true;
    passwordInputField.type = 'password'
  }

  // reactive form config
  wrongCredentials: boolean = false;
  loginForm: FormGroup;
  invalidForm: boolean = false;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }
//login function
  OnLogin() {
    if (this.loginForm.valid) {
      let loginData: loginValue = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      }
      this.wrongCredentials = !this.authenticationService.validateLoginCredentials(loginData);
      this.wrongCredentials ? console.log('log In unsuccessful') : this.router.navigate(['/posts']);
    } else {
      this.invalidForm = true;
    }

  }
  //form validation error hide
  CloseErrorPopUp() {
    this.invalidForm = false;
  }

  hideWrongCredentialError() {
    this.wrongCredentials = false;
  }

}
