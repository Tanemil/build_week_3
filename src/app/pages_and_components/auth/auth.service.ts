import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from './interfaces/iauth-data';
import { ISignupData } from './interfaces/isignup-data';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private loggedIn = false;
  authSubject = new BehaviorSubject<IAuthData | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserLogin();
  }

  /* isAuthenticated(): boolean {
    return this.loggedIn;
  } */

  restoreUserLogin() {
    const json = localStorage.getItem('isAuthenticated');
    if(json) {
      const user = JSON.parse(json);
      if(this.helper.isTokenExpired(user.accessToken)) {
        localStorage.removeItem('isAuthenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  login(obj: ISignupData) {
    //this.loggedIn = true;
    return this.http.post<IAuthData>(this.urlJsonServer+'/login', obj).pipe(
      /* tap(ele => console.log(ele)), */
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: ISignupData) {
    return this.http.post(this.urlJsonServer+'/register', obj);
  }

  logout() {
    /* this.loggedIn = false; */
    console.log('Logout')
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

}
