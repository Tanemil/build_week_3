import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { IClientsData } from '../../interfaces/iclients-data';
import { ActualClientIdService } from '../../../actual-client-id.service'

@Component({
  selector: 'app-clients-mat-table',
  templateUrl: './clients-mat-table.component.html',
  styleUrls: ['./clients-mat-table.component.scss']
})

export class ClientsMatTableComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = ['id', 'nomeContatto', 'cognomeContatto', 'partitaIva', 'email', 'removeClient', 'viewInvoices'];
  clients: IClientsData[] = [];
  dataSource: MatTableDataSource<IClientsData> = new MatTableDataSource(this.clients);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private actual_id: ActualClientIdService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  ngOnChanges(): void {
    //this.dataSource = new MatTableDataSource(this.clients);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* ----- Post & Get nel db.json (dentro clients) ----- */

  async getAllClients(): Promise<void> {
    await this.authService.authSubject.subscribe(client => {
      this.http.get<IClientsData[]>('http://localhost:4201/clients', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            let parseRes: IClientsData[] = <IClientsData[]><unknown>resp;
            this.clients = parseRes;
            this.dataSource = new MatTableDataSource(this.clients)
            console.log(this.clients, resp, parseRes);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  getAfterDelete() {
    this.authService.authSubject.subscribe(client => {
      this.http.get<IClientsData[]>('http://localhost:4201/clients', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            let parseRes: IClientsData[] = <IClientsData[]><unknown>resp;
            this.clients = parseRes;
            this.dataSource = new MatTableDataSource(this.clients)
            console.log(this.clients, resp, parseRes);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  removeClient(id: number): void {
    console.log(id)
    this.authService.removeAllTaxes(this.clients[id-1].id);
    this.authService.removeClientS(id).subscribe();
    this.getAfterDelete();
  }

  set_acual_id(id: number) {
    this.actual_id.changeState(id);
  }

}

