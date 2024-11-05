import { Injectable } from '@angular/core';
import { signUpValue } from './signupValue.model';
import { loginValue } from './loginValue.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  private LoggedIn = false;

  saveToLocalStorage(userInput: signUpValue) {
    localStorage.setItem('signupValue', JSON.stringify(userInput));
  }

  validateLoginCredentials(loginData: loginValue) {
    let signupValue: signUpValue = JSON.parse(localStorage.getItem('signupValue'));

    if (signupValue.email === loginData.email && signupValue.password === loginData.password) {
      this.LoggedIn = true;
      return true;
    } else {
      return false;
    }
    
  }

}
