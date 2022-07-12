import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
