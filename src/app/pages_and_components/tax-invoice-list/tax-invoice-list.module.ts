import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoiceListRoutingModule } from './tax-invoice-list-routing.module';
import { TaxInvoiceListPage } from './tax-invoice-list.page';


@NgModule({
  declarations: [
    TaxInvoiceListPage
  ],
  imports: [
    CommonModule,
    TaxInvoiceListRoutingModule
  ]
})
export class TaxInvoiceListModule { }
