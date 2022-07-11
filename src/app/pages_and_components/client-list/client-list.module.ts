import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListComponent } from './client-list.component';


@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientListRoutingModule
  ]
})
export class ClientListModule { }
