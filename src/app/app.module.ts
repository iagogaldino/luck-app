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
import { MessageComponent } from './components/message/message.component';
import { CasesUseComponent } from './components/cases-use/cases-use.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LimitToPipe } from './pipes/limitToPipe.pipe';
import { Interceptor } from './core/interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ConfigAppService } from './services/config-app.service';
import { KeypassComponent } from './shared/keypass/keypass.component';
import { StatusGameComponent } from './components/status-game/status-game.component';

const MaterialComponents = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatBottomSheetModule,
  MatProgressBarModule,
  MatDialogModule
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
    TicketComponent,
    MessageComponent,
    CasesUseComponent,
    DialogComponent,
    LimitToPipe,
    KeypassComponent,
    StatusGameComponent
  ],
  imports: [
    ...MaterialComponents,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigAppService,
    AuthGuard,
    provideEnvironmentNgxMask(), {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
