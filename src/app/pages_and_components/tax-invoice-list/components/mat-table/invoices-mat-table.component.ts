import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { ActualClientIdService } from 'src/app/pages_and_components/actual-client-id.service';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { ITaxesData } from 'src/app/pages_and_components/client-list/interfaces/itaxes-data';

@Component({
  selector: 'app-invoices-mat-table',
  templateUrl: './invoices-mat-table.component.html',
  styleUrls: ['./invoices-mat-table.component.scss']
})

export class InvoicesMatTableComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  displayedColumns: string[] = ['id', 'data', 'numero', 'anno', 'importo'];
  invoices: ITaxesData[] = [];
  dataSource: MatTableDataSource<ITaxesData> = new MatTableDataSource(this.invoices);
  client_id!: number


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('f') form!: NgForm;
  error = undefined;


  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private actual_client: ActualClientIdService,
  ) {
    // Create 100 users
    /* const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1)); */

    // Assign the data to the data source for the table to render
    /* this.dataSource = new MatTableDataSource(this.clients); */
    /*  this.dataSource = this.getAllClients() */
  }
  ngOnInit(): void {
    this.get_actual_client_id()
    this.getAllInvoices();
    this.dataSource = new MatTableDataSource(this.invoices);
  }

  ngOnChanges(): void {
    /*     this.getAllInvoices()
        this.dataSource = new MatTableDataSource(this.invoices); */
  }

  ngDoCheck(): void {
    /*     if (this.invoices.length > this.getAllInvoices().lenght){
          this.getAllInvoices()
          this.dataSource = new MatTableDataSource(this.invoices);
          controllo = this.invoices.length
        } */
    /*     this.getAllInvoices()
        this.dataSource = new MatTableDataSource(this.invoices); */
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

  get_actual_client_id() {
    this.actual_client.getState().subscribe(resp => {
      this.client_id = resp
    })
  }

  /* ----- Post & Get nel db.json (dentro clients) ----- */

  async getAllInvoices() {
    await this.authService.authSubject.subscribe(client => {
      this.http.get<ITaxesData[]>('http://localhost:4201/taxes', {
        headers: new HttpHeaders({ "Authorization": "Bearer " + client?.accessToken })
      })
        .subscribe(
          resp => {
            // tramite la risposta del get, inserisce i dati dal db, nell'array clients
            //console.log(resp);
            //this.clients = resp;

            //let jsonObj: any = JSON.parse(resp); // string to generic object first
            let parseRes: ITaxesData[] = <ITaxesData[]><unknown>resp;
            let prop: ITaxesData[] = []
            parseRes.forEach(element =>{
              if (element.cliente.id === this.client_id ){
                prop.push(element)
              }
            })
            this.invoices = prop;
            this.dataSource = new MatTableDataSource(this.invoices)
            console.log(this.invoices, resp, parseRes);

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

