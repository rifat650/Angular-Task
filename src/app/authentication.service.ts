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

  getSignupValue() {
    if (this.LoggedIn) {
      return JSON.parse(localStorage.getItem('signupValue'))
    } else {
      return false;
    }

  }

  validateLoginCredentials(loginData: loginValue) {
    //--
    let signupValue: signUpValue = JSON.parse(localStorage.getItem('signupValue'))

    if (signupValue != null) {
      if (signupValue.email === loginData.email && signupValue.password === loginData.password) {
        this.LoggedIn = true;
        localStorage.setItem('LoggedIn', 'true');
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  LogOutUser() {
    this.LoggedIn = false;
    localStorage.removeItem('signupValue');
    localStorage.removeItem('LoggedIn')
  }

  SetIsLoggedIn() {
    this.LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
  }
  
  UserLoggedIn() {
    return this.LoggedIn;
  }
}
