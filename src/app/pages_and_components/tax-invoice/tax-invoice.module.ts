import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoiceRoutingModule } from './tax-invoice-routing.module';
import { TaxInvoicePage } from './tax-invoice.page';


@NgModule({
  declarations: [
    TaxInvoicePage
  ],
  imports: [
    CommonModule,
    TaxInvoiceRoutingModule
  ]
})
export class TaxInvoiceModule { }
