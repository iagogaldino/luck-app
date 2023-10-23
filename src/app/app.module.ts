import { GameComponent } from './components/game/game.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { BoxInfoComponent } from './shared/box-info/box-info.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { BodyContentComponent } from './shared/body-content/body-content.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BtSheetComponent } from './components/bt-sheet/bt-sheet.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TicketComponent } from './components/ticket/ticket.component';

const MaterialComponents = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatBottomSheetModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoxInfoComponent,
    ConfirmationComponent,
    BodyContentComponent,
    GameComponent,
    BtSheetComponent,
    TicketComponent
  ],
  imports: [
    ...MaterialComponents,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
