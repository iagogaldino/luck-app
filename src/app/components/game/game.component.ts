import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BtSheetComponent } from '../bt-sheet/bt-sheet.component';
import { BtSheetService } from '../bt-sheet/bt-sheet.service';
import { ConfigAppService } from 'src/app/services/config-app.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public items = this.configAppService.itemsLuck;

  itemSelected = 0;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _btSheetService: BtSheetService,
    public configAppService: ConfigAppService
  ) {}

  ngOnInit() {
    // this.showSheetWIN();

  }

  onClickItem(item: number):void {
    this.itemSelected = item;
  }

  onClickConfirm(): void {
    this.showSheetWIN();
    // this.showSheetNoWIN();
  }

  showSheetWIN(): void {
    this._btSheetService.typeSheet = 1;
    this._bottomSheet.open(BtSheetComponent);
  }

  showSheetNoWIN(): void {
    this._btSheetService.typeSheet = 0;
    this._bottomSheet.open(BtSheetComponent);
  }
}
