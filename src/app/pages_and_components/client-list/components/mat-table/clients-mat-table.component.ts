import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages_and_components/auth/auth.service';
import { IClientsData } from '../../interfaces/iclients-data';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-mat-table',
  templateUrl: './clients-mat-table.component.html',
  styleUrls: ['./clients-mat-table.component.scss']
})

export class ClientsMatTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'p.iva', 'email', 'tel'];
  dataSource: MatTableDataSource<IClientsData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('f') form!: NgForm;
  error = undefined;
  clients: IClientsData[] = [];

  constructor(
    private clientsServ: ClientsService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    // Create 100 users
    /* const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1)); */

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.clients);
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

  /* --------------------------------------- */

  onSubmit() {
    this.clientsServ.postClientS(this.form.value).subscribe(
      resp => {
        this.error = undefined;
        this.router.navigate(['/tax_invoice_list']);
      },
      err => {
        this.error = err.error;
      }
    )
    this.clientsServ.getClientS();
  }



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
