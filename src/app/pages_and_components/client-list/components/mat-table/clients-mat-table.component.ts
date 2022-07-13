import { HttpClient } from '@angular/common/http';
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
  displayedColumns: string[] = ['id', 'name', 'p.iva', 'email', 'tel'];
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
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* --------------------------------------- */

  getAllClients() {
    this.authService.getAllClientsS();
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

