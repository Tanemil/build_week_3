import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxInvoicePage } from './tax-invoice.page';

const routes: Routes = [{ path: '', component: TaxInvoicePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxInvoiceRoutingModule { }
