import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IClientsData } from '../../interfaces/iclients-data';

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

  storedClient!: any;
  parsedClient!: IClientsData;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    let storedClient: any = localStorage.getItem('ele');
    this.parsedClient = JSON.parse(storedClient);

    let pIva: any = this.parsedClient.partitaIva!.valueOf();
    let tel: any = this.parsedClient.telefono!.valueOf();
    let civicoSedeOp: any = this.parsedClient.indirizzoSedeOperativa!.civico!.valueOf();
    let capSedeOp: any = this.parsedClient.indirizzoSedeOperativa!.cap!.valueOf();
    let civicoSedeL: any = this.parsedClient.indirizzoSedeLegale!.civico!.valueOf();
    let capSedeL: any = this.parsedClient.indirizzoSedeLegale!.cap!.valueOf();

    this.clientForm.get('nomeCliente')?.setValue(this.parsedClient.nomeCliente!);
    this.clientForm.get('cognomeCliente')?.setValue(this.parsedClient.cognomeCliente!);
    this.clientForm.get('ragioneSociale')?.setValue(this.parsedClient.ragioneSociale!);
    this.clientForm.get('partitaIva')?.setValue(pIva);
    this.clientForm.get('tipoCliente')?.setValue(this.parsedClient.tipoCliente!);
    this.clientForm.get('telefono')?.setValue(tel);
    this.clientForm.get('email')?.setValue(this.parsedClient.email!);
    this.clientForm.get('pec')?.setValue(this.parsedClient.pec!);

    this.clientForm.get('indirizzoSedeOperativa.via')?.setValue(this.parsedClient.indirizzoSedeOperativa!.via!);
    this.clientForm.get('indirizzoSedeOperativa.civico')?.setValue(civicoSedeOp);
    this.clientForm.get('indirizzoSedeOperativa.cap')?.setValue(capSedeOp);
    this.clientForm.get('indirizzoSedeOperativa.localita.comune')?.setValue(this.parsedClient.indirizzoSedeOperativa!.localita!.comune!);
    this.clientForm.get('indirizzoSedeOperativa.localita.provincia')?.setValue(this.parsedClient.indirizzoSedeOperativa!.localita!.provincia!);

    this.clientForm.get('indirizzoSedeLegale.via')?.setValue(this.parsedClient.indirizzoSedeLegale!.via!);
    this.clientForm.get('indirizzoSedeLegale.civico')?.setValue(civicoSedeL);
    this.clientForm.get('indirizzoSedeLegale.cap')?.setValue(capSedeL);
    this.clientForm.get('indirizzoSedeLegale.localita.comune')?.setValue(this.parsedClient.indirizzoSedeLegale!.localita!.comune!);
    this.clientForm.get('indirizzoSedeLegale.localita.provincia')?.setValue(this.parsedClient.indirizzoSedeLegale!.localita!.provincia!);
  }

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

