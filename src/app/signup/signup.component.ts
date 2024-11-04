import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //password show and hide
  passwordUnseenMode=true;
  SeePassword(passwordInputField: HTMLInputElement) {
    this.passwordUnseenMode=false;
    passwordInputField.type = "text";
  }
  hidePassword(passwordInputField: HTMLInputElement){
    this.passwordUnseenMode=true;
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

}
