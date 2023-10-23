import { Component, OnInit } from '@angular/core';
import { BtSheetService } from './bt-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bt-sheet',
  templateUrl: './bt-sheet.component.html',
  styleUrls: ['./bt-sheet.component.css']
})
export class BtSheetComponent implements OnInit {

  constructor(private router: Router, public btSheetService: BtSheetService) { }

  ngOnInit() {
  }

  onClickGetTicket(): void {
    this.router.navigate(['ticket']);
  }

}
