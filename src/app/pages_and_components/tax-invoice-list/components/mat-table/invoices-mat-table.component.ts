import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActualClientIdService } from 'src/app/pages_and_components/actual-client-id.service';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ITaxesData } from '../../interfaces/itaxes-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-invoices-mat-table',
  templateUrl: './invoices-mat-table.component.html',
  styleUrls: ['./invoices-mat-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InvoicesMatTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('f') form!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'data', 'numero', 'scadenza', 'importo'];
  invoices: ITaxesData[] = [];
  dataSource: MatTableDataSource<ITaxesData> = new MatTableDataSource(this.invoices);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: ITaxesData | null;
  private urlJsonServer = 'http://localhost:4201';
  client_id!: any;
  storedId!: any;
  error = undefined;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private actual_client: ActualClientIdService,
    private router: Router) { }

  ngOnInit(): void {
    this.get_actual_client_id(); // get id cliente
    this.getAllInvoices();
    this.dataSource = new MatTableDataSource(this.invoices);
    //this.loadClientId();
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.invoices);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  /* legare invoices all'id del cliente corr.  */
  get_actual_client_id() {
    this.actual_client.getState().subscribe(resp => {
      this.client_id = resp
    })
  }

  /* crea un table e success lo popola con i dati */
  getAllInvoices() {
    this.authService.authSubject.subscribe(client => {
      this.http.get<ITaxesData[]>('http://localhost:4201/taxes', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            /* cast dell'oggetto json intero (resp) per tipizzarle in prop come quelle dell'interfaccia */
            let castResp: ITaxesData[] = <ITaxesData[]><unknown>resp;
            let prop: ITaxesData[] = [];
            castResp.forEach(element => {
              if (element.cliente.id === this.client_id) {
                prop.push(element)
              }
            })
            this.invoices = prop;
            this.dataSource = new MatTableDataSource(this.invoices)
            console.log(this.invoices, resp, castResp);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  removeInvoice(id: number): void {
    this.authService.removeInvoiceS(id).subscribe();
    this.getAllInvoices();
  }

  loadClientId() {
    this.client_id = sessionStorage.getItem('idCliente');
  }

}


