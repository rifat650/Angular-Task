import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //password hide and see feature
  passwordUnseenMode=true;
  SeePassword(passwordInputField:HTMLInputElement){
    this.passwordUnseenMode=false;
    passwordInputField.type='text';
  }
  hidePassword(passwordInputField:HTMLInputElement){
    this.passwordUnseenMode=true;
    passwordInputField.type='password'
  }
}
