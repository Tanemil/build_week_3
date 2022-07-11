import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInvoiceRoutingModule } from './tax-invoice-routing.module';
import { TaxInvoiceComponent } from './tax-invoice.component';


@NgModule({
  declarations: [
    TaxInvoiceComponent
  ],
  imports: [
    CommonModule,
    TaxInvoiceRoutingModule
  ]
})
export class TaxInvoiceModule { }
