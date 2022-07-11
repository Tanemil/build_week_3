import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoiceListRoutingModule } from './tax-invoice-list-routing.module';
import { TaxInvoiceListComponent } from './tax-invoice-list.component';


@NgModule({
  declarations: [
    TaxInvoiceListComponent
  ],
  imports: [
    CommonModule,
    TaxInvoiceListRoutingModule
  ]
})
export class TaxInvoiceListModule { }
