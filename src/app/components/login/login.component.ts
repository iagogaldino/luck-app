import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  focusInput = false;
  @ViewChild('btenter') btenter!: ElementRef;
  @ViewChild('inPass') inPass!: ElementRef;
  tInterval: any;

  constructor(
    private _route: Router,
    public configAppService: ConfigAppService,
    private _webServiceService: WebServiceService,
    private _dialog: MatDialog,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      phone: ['', Validators.required],
      // phone: '1234'
    });

    this.form.get('phone')?.valueChanges.subscribe((value: string) => {
      if (value.length == 11) {
        this.inPass.nativeElement.blur();
        this.btenter.nativeElement.focus();
        this.onInputBlur();
      }
    });
  }

  ngOnInit() {
    this.getConfigApp();
    this.shutim();
  }

  onInputFocus(): void {
    console.log('onInputFocus');
    // this.focusInput = true;
  }
  onInputBlur(): void {
    console.log('onInputBlur');
    // this.focusInput = false;
  }

  onClickEnter(): void {
    const params = this.form.value;
    this._webServiceService.loading = true;
    this._webServiceService.login(params).subscribe({
      next: (response) => {
        this.configAppService.token = response.token;
        this.configAppService.userName = response.userName;
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
    this._webServiceService.loading = true;
    this._webServiceService.getConfigApp().subscribe({
      next: (response) => {
        this._webServiceService.loading = false;
        this.usersWIN = this.shuffleArray(response.usersWIN);
        this.configAppService.linkMap = response.linkMap;
        this.configAppService.titleBrind = response.titleBrind;
        if (!response.statusGame) {
          this._route.navigate(['status-game']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._webServiceService.loading = false;
      },
    });
  }

  shutim(): void {
    this.tInterval = setInterval(() => {
      this.usersWIN = this.shuffleArray(this.usersWIN);
    }, 3500);
  }

  openDialog(params: any) {
    const dialogRef = this._dialog.open(DialogComponent, { data: params });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  ngOnDestroy() {
    clearInterval(this.tInterval);
  }
}
