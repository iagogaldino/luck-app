import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfigAppService } from 'src/app/services/config-app.service';

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
  constructor(
    private _route: Router,
    public configAppService: ConfigAppService
  ) {}

  ngOnInit() {}

  onClickEnter(): void {
    this._route.navigate(['confirmation']);
  }
}
