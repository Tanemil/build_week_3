import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { IClientsData } from '../../interfaces/iclients-data';

@Component({
  selector: 'app-clients-mat-table',
  templateUrl: './clients-mat-table.component.html',
  styleUrls: ['./clients-mat-table.component.scss']
})

export class ClientsMatTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nomeContatto', 'cognomeContatto', 'partitaIva', 'email'];
  dataSource: MatTableDataSource<IClientsData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('f') form!: NgForm;
  error = undefined;
  clients: IClientsData[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    // Create 100 users
    /* const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1)); */

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.clients);
  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllClients();
    console.log(this.clients);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* ----- Post & Get nel db.json (dentro clients) ----- */

  getAllClients(): any {
    this.authService.authSubject.subscribe(client => {
      this.http.get<IClientsData[]>('http://localhost:4201/clients', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            // tramite la risposta del get, inserisce i dati dal db, nell'array clients
            //console.log(resp);
            //this.clients = resp;

            //let jsonObj: any = JSON.parse(resp); // string to generic object first
            let parseRes: IClientsData[] = <IClientsData[]><unknown>resp;
            this.clients = parseRes;
            console.log(this.clients, resp, parseRes);
          },
          err => {
            console.log(err);
            this.error = err.error
          }
        )
    })
  }

  /*   onSubmit() { // reindirizzam. su tax_invoice_list e poi faro' un get dei dati
      this.clientsServ.add_client(this.form.value).subscribe(
        resp => {
          this.error = undefined;
          this.router.navigate(['/tax_invoice_list']);
        },
        err => {
          this.error = err.error;
        }
      )
    } */



}

/** Builds and returns a new User. */
/* function createNewUser(id: number): IClientsData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
} */

