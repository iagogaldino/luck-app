import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onClickConfirm(): void {
    this._router.navigate(['game']);
  }

}
