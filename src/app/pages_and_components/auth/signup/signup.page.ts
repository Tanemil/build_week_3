import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log(this.form.value)
    this.authService.signup(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
        this.router.navigate(['/login'])
      },
      err  => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
