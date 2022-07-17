import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActualClientIdService } from '../../..//actual-client-id.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices-mat-form',
  templateUrl: './invoices-mat-form.component.html',
  styleUrls: ['./invoices-mat-form.component.scss']
})
export class InvoicesMatFormComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  client_id!: number
  hide = true;
  error = undefined;
  panelOpenState = false;

  /* Definisco raggruppamento dati che verranno scritti nel db (per leggere dati json castare resp del get) */
  clientForm = new FormGroup({
    data: new FormControl(''),
    numero: new FormControl(''),
    scadenza: new FormControl(''),
    importo: new FormControl(''),
    natura: new FormControl(''),
    quantita: new FormControl(''),
    cliente: new FormGroup({
      nome: new FormControl(),
      id: new FormControl()
    })
  });

  constructor(
    private authService: AuthService,
    private actual_client: ActualClientIdService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get_actual_client_id()
    this.clientForm.get('cliente.id')?.setValue(this.client_id);
    console.log(this.client_id);
  }

  onSubmit() {
    this.ngOnInit();
    console.log('submit', this.client_id)

    this.authService.add_taxes(this.form.value).subscribe(
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

  get_actual_client_id() {
    this.actual_client.getState().subscribe(resp => {
      this.client_id = resp
    })
  }

}

