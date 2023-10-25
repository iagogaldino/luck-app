import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
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
    private sanitizer: DomSanitizer
  ) {}

  public safeSvg: any;

  ngOnInit() {
    this.getQRcode();
  }

  private getQRcode(): void {
    this._webServiceService.loading = true;
    this._webServiceService.getQRcode().subscribe({
      next: (res) => {
        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(res.svg);
      },
      error: (err) => {
        console.log('ERRRRO', err);
      },
      complete: ()=>{ this._webServiceService.loading = false; }
    });
  }
}
