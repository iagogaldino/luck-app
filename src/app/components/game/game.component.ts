import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BtSheetComponent } from '../bt-sheet/bt-sheet.component';
import { BtSheetService } from '../bt-sheet/bt-sheet.service';
import { ConfigAppService } from 'src/app/services/config-app.service';
import { WebServiceService } from 'src/app/services/web-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public items: Array<{ idItemsGame: number; name: string }> = [];

  itemSelected = 0;
  chance = 0;
  gameStatus = true;
  itemGame = 0;
  codeFriend = 0;
  tInterval: any;
  winGame = false;
  userName = '';
  form!: FormGroup;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _btSheetService: BtSheetService,
    public configAppService: ConfigAppService,
    public _webServiceService: WebServiceService,
    private _dialog: MatDialog,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.getConfigGame(true);
    this.repeatLoadConfigGame();
    this.configAppService.codeConfirmed = true;
    this.userName = this.configAppService.userName;
  }

  ngOnDestroy() {
    this._bottomSheet.dismiss();
    clearInterval(this.tInterval);
  }

  public confirmName(): void {
    this._webServiceService.loading = true;
    this._webServiceService
      .confirmName(this.form.value)
      .subscribe({ next: (resp) => {
        this.userName = this.form.get('name')?.value;
        this._webServiceService.loading = false;
      }, error: (err) => {
        alert(err.error.message)
        this._webServiceService.loading = false;
      } });
  }

  private repeatLoadConfigGame(): void {
    this.tInterval = setInterval(() => {
      this.getConfigGame(false);
    }, 5000);
  }

  private validateItemGame(): void {
    const idItem = this.itemSelected;
    this._webServiceService.loading = true;
    this._webServiceService.validateItemGame(idItem).subscribe({
      next: (res) => {
        this._webServiceService.loading = false;
        this.winGame = true;
        this.showSheetWIN();
        this.vibrateWIN();
      },
      error: (err) => {
        this.gameStatus = false;
        this._webServiceService.loading = false;

        if (!this.itemGame) {
          this.itemGame = err.error.itemGame;
          this.chance -= 1;
          this.codeFriend = err.error.codeFriend;
          this.repeatLoadConfigGame();
        }
        setTimeout(() => {
          this.items = [];
        }, 3000);
      },
    });
  }

  private startGame(items: any[], chance: number): void {
    console.log('startGame');
    this.items = items;
    this.chance = chance;
    this.itemSelected = 0;
    this.gameStatus = true;
    this.itemGame = 0;
    clearInterval(this.tInterval);
  }

  private getConfigGame(loading: boolean): void {
    if (loading) {
      this._webServiceService.loading = true;
    }

    this._webServiceService.getConfigGame().subscribe({
      next: (res) => {
        this.startGame(res.itemsGame, res.chance);
        this._webServiceService.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.codeFriend = err.error.codeFriend;
        this._webServiceService.loading = false;
      },
    });
  }

  onClickItem(item: number): void {
    if (!this.gameStatus) {
      return;
    }
    this.itemSelected = item;
    navigator.vibrate(100);
  }

  private vibrateWIN(): void {
    navigator.vibrate(1000);
  }

  onClickConfirm(): void {
    if (!this.gameStatus) {
      return;
    }
    if (this.winGame) {
      this._router.navigate(['ticket']);
      return;
    }
    this.validateItemGame();
  }

  private showSheetWIN(): void {
    this._btSheetService.typeSheet = 1;
    this._bottomSheet.open(BtSheetComponent);
  }

  private showSheetNoWIN(codeFriend: number, typeSheet: number): void {
    this._btSheetService.typeSheet = typeSheet;
    this._btSheetService.codeFriend = codeFriend;
    this._bottomSheet.open(BtSheetComponent);
  }

  private openDialog(params: any) {
    const dialogRef = this._dialog.open(DialogComponent, { data: params });

    dialogRef.afterClosed().subscribe((result) => {
      this._router.navigate(['ticket']);
    });
  }

  private createForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
    });
  }
}
