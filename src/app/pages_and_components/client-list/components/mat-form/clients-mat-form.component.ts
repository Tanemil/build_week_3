import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-clients-mat-form',
  templateUrl: './clients-mat-form.component.html',
  styleUrls: ['./clients-mat-form.component.scss']
})
export class ClientsMatFormComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;
  error = undefined;
  panelOpenState = false;

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {

    this.authService.add_client(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
