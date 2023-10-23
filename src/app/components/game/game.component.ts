import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BtSheetComponent } from '../bt-sheet/bt-sheet.component';
import { BtSheetService } from '../bt-sheet/bt-sheet.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public items = [
    { name: 'Carne' },
    { name: 'Frango' },
    { name: 'Suíno' },
    { name: 'Queijo' },
  ];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _btSheetService: BtSheetService
  ) {}

  ngOnInit() {
    this.showSheetWIN();

  }

  onClickConfirm(): void {
    // this.showSheetWIN();
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
