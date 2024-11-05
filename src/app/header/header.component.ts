import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterLink } from '@angular/router';
import { signUpValue } from '../signupValue.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //services
  authenticationService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  //properties
  isLoggedIn = this.authenticationService.UserLoggedIn();
  userInformation:signUpValue=this.authenticationService.getSignupValue()

  //user info
  showUserInfo = false;
  OnUserIconClick() {
    this.showUserInfo = !this.showUserInfo
  }

  //logout
  onLogout() {
    this.authenticationService.LogOutUser();
    this.isLoggedIn = this.authenticationService.UserLoggedIn();
  }


}
