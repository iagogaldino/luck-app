import { Component } from '@angular/core';
import { WebServiceService } from './services/web-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public webServiceService: WebServiceService) {}
  title = 'luck-app';
}
