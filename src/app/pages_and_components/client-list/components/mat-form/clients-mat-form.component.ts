import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-mat-form',
  templateUrl: './clients-mat-form.component.html',
  styleUrls: ['./clients-mat-form.component.scss']
})
export class ClientsMatFormComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;

  /* Raggruppamento dei dati nel db per essere letti dopo il cast */
  clientForm = new FormGroup({
    nomeCliente: new FormControl(''),
    cognomeCliente: new FormControl(''),
    ragioneSociale: new FormControl(''),
    partitaIva: new FormControl(''),
    tipoCliente: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    pec: new FormControl(''),

    indirizzoSedeOperativa: new FormGroup({
      via: new FormControl(''),
      civico: new FormControl(''),
      cap: new FormControl(''),
      localita: new FormGroup({
        comune: new FormControl(''),
        provincia: new FormControl(''),
      })
    }),

    indirizzoSedeLegale: new FormGroup({
      via: new FormControl(''),
      civico: new FormControl(''),
      cap: new FormControl(''),
      localita: new FormGroup({
        comune: new FormControl(''),
        provincia: new FormControl(''),
      })
    })
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {

    this.authService.add_client(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    )

    this.authService.reloadRoute();
  }

}

