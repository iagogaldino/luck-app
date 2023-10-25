import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigAppService } from 'src/app/services/config-app.service';
import { WebServiceService } from 'src/app/services/web-service.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  constructor(
    public _webServiceService: WebServiceService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer,
    public configAppService: ConfigAppService
  ) {}

  public safeSvg: any;

  ngOnInit() {
    this.getQRcode();
    this.configAppService.gameWin = true;
  }

  private getQRcode(): void {
    this._webServiceService.loading = true;
    this._webServiceService.getQRcode().subscribe({
      next: (res) => {
        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(res.svg);
        this._webServiceService.loading = false;
      },
      error: (err) => {
        console.log('ERRRRO', err);
        this._webServiceService.loading = false;
      },
    });
  }

  onClickOpenLocation(): void {
    window.open(this.configAppService.linkMap);
  }
}
