import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthData } from './interfaces/iauth-data';
import { ISignupData } from './interfaces/isignup-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IClientsData } from '../client-list/interfaces/iclients-data';
import { ITaxesData } from '../client-list/interfaces/itaxes-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthData | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();
  error = undefined;
  /*   clients: IClientsData[] = []; */

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

  removeAllTaxes(client_id:number): any{
    return this.http.get('http://localhost:4201/taxes').subscribe(resp => {
        let parseRes: ITaxesData[] = <ITaxesData[]><unknown>resp;
          parseRes.forEach(element => {
          console.log(element)
          if (element.cliente.id === client_id){
            this.removeTaxes(element).subscribe()
          }
        });
    })
  }

  removeTaxes(element:ITaxesData){
    let id_elemento_da_cancellare = element.id
    return this.http.delete('http://localhost:4201/taxes/'+id_elemento_da_cancellare)
  }

  removeClientS(id: number): Observable<Object> {

    return this.http.delete('http://localhost:4201/clients/' + id);

    /*     this.authSubject.subscribe(client => {
          this.http.delete('http://localhost:4201/clients/' + id, {
            headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
          })
        }) */
  }
  /*
    modClientS(id: number): Observable<Object> {
      return this.http.delete('http://localhost:4201/clients/' + id);
    } */

  /* aggiunge valori di ritorno del form, al db */
  add_client(obj: IClientsData) {
    return this.http.post(this.urlJsonServer + '/clients', obj);
  }

  add_taxes(obj: ITaxesData) {
    return this.http.post(this.urlJsonServer + '/taxes', obj);
  }

  get_taxes_by_id() {
    return this.http.get(this.urlJsonServer + '/taxes');
  }

}
