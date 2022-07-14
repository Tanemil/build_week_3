import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActualClientIdService } from '../../..//actual-client-id.service'

@Component({
  selector: 'app-clients-mat-form',
  templateUrl: './clients-mat-form.component.html',
  styleUrls: ['./clients-mat-form.component.scss']
})
export class ClientsMatFormComponent implements OnInit {

  client_id:number = this.actual_client.get_id()

  @ViewChild('f') form!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;

  clientForm = new FormGroup({
    data: new FormControl(),
    numero: new FormControl(),
    anno: new FormControl(),
    importo : new FormControl(),
    stato : new FormGroup({
      id: new FormControl(),
      nome : new FormControl(),
    }),
    cliente : new FormGroup({
      id : new FormControl()
    })
  });

  constructor(
    private authService: AuthService,
    private actual_client:ActualClientIdService
    ) { }

  ngOnInit(): void {
    this.get_actual_client_id()
  }

  onSubmit() {

    console.log('submit')

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

  }

  refresh(): void {
    this.actual_client.set_id(this.client_id)
    window.location.reload();
  }

  get_actual_client_id(){
    this.client_id = this.actual_client.get_id()
  }

}

