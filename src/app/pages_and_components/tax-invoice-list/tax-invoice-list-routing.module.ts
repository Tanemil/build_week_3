import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxInvoiceListComponent } from './tax-invoice-list.component';

const routes: Routes = [{ path: '', component: TaxInvoiceListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxInvoiceListRoutingModule { }
