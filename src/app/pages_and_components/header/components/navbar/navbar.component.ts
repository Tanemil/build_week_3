import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {

  showSignUp: boolean = true;
  showLogin: boolean = true;
  showLogout: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    // **SOSTITUIRE CON OUTPUT ED EVENT EMITTER (login con parametro del form)
    if (localStorage.length >= 1) {
      this.showLogout = true;
      this.showLogin = false;
      this.showSignUp = false;
    }
  }

  logout() {
    this.authService.logout();
    this.showLogout = false;
    this.showLogin = true;
    this.showSignUp = true;
  }

}
