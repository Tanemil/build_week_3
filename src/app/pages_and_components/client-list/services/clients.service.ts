import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/auth.service';
import { IClientsData } from '../interfaces/iclients-data';
import { IAuthData } from '../../auth/interfaces/iauth-data';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  authSubject = new BehaviorSubject<IAuthData | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();

  clients: IClientsData[] = [];
  error = undefined;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  /* ----- Post & Get nel db.json (dentro clients) ----- */

  getAllClientsS() {
    this.authService.authSubject.subscribe(client => {
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

  add_client(obj: IClientsData) {
    return this.http.post(this.urlJsonServer + '/clients', obj);
  }

}
