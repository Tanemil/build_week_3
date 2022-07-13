import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from './interfaces/iauth-data';
import { ISignupData } from './interfaces/isignup-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IClientsData } from '../client-list/interfaces/iclients-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthData | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();
  error = undefined;
  clients: IClientsData[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserLogin();
  }

  restoreUserLogin() {
    const json = localStorage.getItem('isAuthenticated');
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.accessToken)) {
        localStorage.removeItem('isAuthenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  login(obj: ISignupData) {
    return this.http.post<IAuthData>(this.urlJsonServer + '/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: ISignupData) {
    return this.http.post(this.urlJsonServer + '/register', obj);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  /* ---------------------------- */

  /* ----- Post & Get nel db.json (dentro clients) ----- */

  getAllClientsS() {
    this.authSubject.subscribe(client => {
      this.http.get<IClientsData[]>('http://localhost:4201/clients', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            // tramite la risposta del get, inserisce i dati dal db, nell'array clients
            this.clients = resp;
          },
          err => {
            this.error = err.error
          }
        )
    })
  }

  /* aggiunge valori di ritorno del form, al db */
  add_client(obj: IClientsData) {
    return this.http.post(this.urlJsonServer + '/clients', obj);
  }

}
