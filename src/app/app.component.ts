import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
authenticationService:AuthenticationService=inject(AuthenticationService);

ngOnInit() {
  this.authenticationService.SetIsLoggedIn()
}
}
