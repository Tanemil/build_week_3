import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("Sono in ngOnInit");
    this.authService.authSubject.subscribe(val => console.log(val?.user) )
  }

  onSubmit() {
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
        this.router.navigate(['home'])
      },
      err  => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
