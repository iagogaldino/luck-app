import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigAppService } from 'src/app/services/config-app.service';
import { WebServiceService } from 'src/app/services/web-service.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _router: Router,
    private _webServiceService: WebServiceService,
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private renderer: Renderer2,
    private _configAppService: ConfigAppService
  ) {
    this.form = this._fb.group({
      code: ['', Validators.required],
      codeFriend: [''],
    });
  }

  ngOnInit() {
    this.form.get('code')?.setValidators(Validators.minLength(4));
  }

  onCompleteCode(event: any): void {
    this.form.get('code')?.setValue(event.code);
  }

  onClickConfirm(): void {
    this.formatFormValues();
    const params = this.form.value;
    this._webServiceService.loading = true;
    this._webServiceService.validateCode(params).subscribe({
      next: () => {
        this._router.navigate(['game']);

      },
      error: (err) => {
        try {
          this.openDialog(err.error.message);
        } catch (err) {
          this.openDialog('Verifique o código informado');
        }
        this._webServiceService.loading = false;
      },
    });
  }

  formatFormValues(): void {
    const codeFormated: string = this.form.get('code')?.value;
    const codeFriendFormated: string = this.form
      .get('codeFriend')
      ?.value.replace(/\s/g, '');
    this.form.get('code')?.setValue(codeFormated);
    this.form.get('codeFriend')?.setValue(codeFriendFormated.toLowerCase());
  }

  onClickResendSendSms() {
    this._webServiceService.loading = true;
    this._webServiceService.sendSMS().subscribe({
      next: (res) => {
        this.openDialog(res.message);
        this._webServiceService.loading = false;
      },
      error: (err) => {
        this.openDialog(err.error.message);
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
