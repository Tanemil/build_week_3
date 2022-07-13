import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListPage } from './client-list.page';


@NgModule({
  declarations: [
    ClientListPage
  ],
  imports: [
    CommonModule,
    ClientListRoutingModule
  ]
})
export class ClientListModule { }
