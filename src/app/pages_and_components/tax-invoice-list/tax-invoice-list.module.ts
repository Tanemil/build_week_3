import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoiceListRoutingModule } from './tax-invoice-list-routing.module';
import { TaxInvoiceListPage } from './tax-invoice-list.page';
import { ClientsMatTableComponent } from './components/mat-table/clients-mat-table.component';
import { ClientsMatFormComponent } from './components/mat-form/clients-mat-form.component';

/* ---------- Material ---------- */
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    TaxInvoiceListPage,
    ClientsMatTableComponent,
    ClientsMatFormComponent
  ],
  imports: [
    CommonModule,
    TaxInvoiceListRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class TaxInvoiceListModule { }
