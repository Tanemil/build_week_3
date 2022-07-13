import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IClientsData } from '../../interfaces/iclients-data';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-mat-form',
  templateUrl: './clients-mat-form.component.html',
  styleUrls: ['./clients-mat-form.component.scss']
})
export class ClientsMatFormComponent implements OnInit {

  panelOpenState = false;

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;

  constructor(private clientsServ: ClientsService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit() {
    this.clientsServ.add_client(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

  /*   getAllClients() {
      console.log('Chiamata Ajax al server')
      this.authService.authSubject.subscribe(userPosts => {
  
        this.http.get<IClientsData[]>('http://localhost:4201/clients', {
          headers: new HttpHeaders({ "Authorization": "Bearer " + userPosts?.accessToken })
        })
          .subscribe(
            resp => {
              this.clients = resp;
            },
            err => {
              this.error = err.error
            }
          )
      })
    } */

}
