import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxInvoiceComponent } from './tax-invoice.component';

const routes: Routes = [{ path: '', component: TaxInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxInvoiceRoutingModule { }
