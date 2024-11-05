import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signUpValue } from '../signupValue.model';
import { AuthenticationService } from '../authentication.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass,HeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  //services
  authenticationService:AuthenticationService=inject(AuthenticationService);
  router:Router=inject(Router);

  //password show and hide
  passwordUnseenMode = true;
  SeePassword(passwordInputField: HTMLInputElement) {
    this.passwordUnseenMode = false;
    passwordInputField.type = "text";
  }
  hidePassword(passwordInputField: HTMLInputElement) {
    this.passwordUnseenMode = true;
    passwordInputField.type = "password";
  }

  //retype password show and hide
  retypePasswordUnseenMode = true;
  SeeRetypedPassword(passwordInputField: HTMLInputElement) {
    this.retypePasswordUnseenMode = false;
    passwordInputField.type = "text";
  }
  hideRetypedPassword(passwordInputField: HTMLInputElement) {
    this.retypePasswordUnseenMode = true;
    passwordInputField.type = "password";
  }


  //reactive form config
  passwordAndRetypePasswordMissMatched: boolean = false;
  FormValidationFailed: boolean = false;
  signUpForm: FormGroup;
  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      retypePassword: new FormControl(null,Validators.required),
      sendAdv: new FormControl(true)
    })
  }

  OnSignUp() {
    
   if (this.signUpForm.valid) {

      if (this.signUpForm.value.password === this.signUpForm.value.retypePassword) {
        let userInput:signUpValue={
          email:this.signUpForm.value.email,
          username:this.signUpForm.value.username,
          password:this.signUpForm.value.password,
          retypePassword: this.signUpForm.value.retypePassword,
          sendAdv: this.signUpForm.value.sendAdv
        }
        
        this.authenticationService.saveToLocalStorage(userInput);
        this.router.navigate(['/login'])

      } else {
        this.passwordAndRetypePasswordMissMatched = true;
      }

    } else {
      this.FormValidationFailed = true;
    }
  }

  //signup error hide

  hidePasswordMisMatchError() {
    this.passwordAndRetypePasswordMissMatched = false;
  }
  hideFormValidationError(){
    this.FormValidationFailed=false;
  }

}

