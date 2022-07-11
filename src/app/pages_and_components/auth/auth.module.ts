import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginPage,
    SignupPage
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
