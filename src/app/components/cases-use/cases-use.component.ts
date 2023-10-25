import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigAppService } from 'src/app/services/config-app.service';
import { WebServiceService } from 'src/app/services/web-service.service';

@Component({
  selector: 'app-cases-use',
  templateUrl: './cases-use.component.html',
  styleUrls: ['./cases-use.component.css'],
})
export class CasesUseComponent implements OnInit {
  constructor(
    private _router: Router,
    private _configAppService: ConfigAppService
  ) {}

  ngOnInit() {}

  onClickHappyFlow(): void {
    this._router.navigate(['login']);
  }

  phoneAlreadyRegistered(): void {
    this._configAppService.flowType = 'phoneAlreadyRegistered';
    this._router.navigate(['login']);
  }
}
