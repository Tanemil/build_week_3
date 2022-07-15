import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActualClientIdService } from '../../..//actual-client-id.service'
import { Router } from '@angular/router';
import { ITaxesData } from 'src/app/pages_and_components/client-list/interfaces/itaxes-data';

@Component({
  selector: 'app-invoices-mat-form',
  templateUrl: './invoices-mat-form.component.html',
  styleUrls: ['./invoices-mat-form.component.scss']
})
export class InvoicesMatFormComponent implements OnInit {

  client_id!: number

  @ViewChild('f') form!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;

  clientForm = new FormGroup({
    data: new FormControl(''),
    numero: new FormControl(''),
    anno: new FormControl(''),
    importo: new FormControl(''),
    stato: new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
    }),
    cliente: new FormGroup({
      id: new FormControl(),

    })
  });

  constructor(
    private authService: AuthService,
    private actual_client: ActualClientIdService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.get_actual_client_id()
    this.clientForm.controls.cliente.controls.id.setValue(this.client_id)
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

    this.changeLocation()

  }

  refresh(): void {
    this.actual_client.changeState(this.client_id)
    window.location.reload();
  }

  get_actual_client_id() {
    this.actual_client.getState().subscribe(resp => {
      this.client_id = resp
    })
  }

  changeLocation() {

    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    });
  }

}

