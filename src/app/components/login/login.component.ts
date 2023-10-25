import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ConfigAppService } from 'src/app/services/config-app.service';
import { WebServiceService } from 'src/app/services/web-service.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('moveItems', [
      transition('* => *', [
        animate(
          '5s',
          keyframes([
            style({ transform: 'translateY(0)' }),
            style({ transform: 'translateY(-100%)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  usersWIN: any = [];
  form: FormGroup;

  constructor(
    private _route: Router,
    public configAppService: ConfigAppService,
    private _webServiceService: WebServiceService,
    private _dialog: MatDialog,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      // name: ['', Validators.required],
      // phone: ['', Validators.required],
      name: 'Iago', phone: '74988420307'
    });
  }

  ngOnInit() {
    this.getConfigApp();
  }

  onClickEnter(): void {
    const params = this.form.value;
    this._webServiceService.loading = true;
    this._webServiceService.login(params).subscribe({
      next: (response) => {
        this.configAppService.token = response.token;
        this._webServiceService.loading = false;
        switch (response.status) {
          case 1:
            {
              this._route.navigate(['game']);
            }
            break;
          case 2:
            {
              this._route.navigate(['confirmation']);
            }
            break;
          case 3:
            {
              this._route.navigate(['confirmation']);
            }
            break;
          case 4:
            {
              this._route.navigate(['ticket']);
            }
            break;
        }
      },
      error: (err: HttpErrorResponse) => {
        this._webServiceService.loading = false;
        this.openDialog(err.error.message);
      },
    });
  }

  getConfigApp(): void {
    this._webServiceService.loading = false;
    this._webServiceService.getConfigApp().subscribe({
      next: (response) => {
        console.log(response);
        this.usersWIN = response.usersWIN;
      },
      error: (err: HttpErrorResponse) => {
        this._webServiceService.loading = false;
      },
    });
  }

  openDialog(params: any) {
    const dialogRef = this._dialog.open(DialogComponent, { data: params });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
