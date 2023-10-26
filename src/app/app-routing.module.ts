import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { GameComponent } from './components/game/game.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CasesUseComponent } from './components/cases-use/cases-use.component';
import { MessageComponent } from './components/message/message.component';
import { AuthGuard } from './guards/auth.guard';
import { StatusGameComponent } from './components/status-game/status-game.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game', component: GameComponent, canActivate:[AuthGuard] },
  { path: 'ticket', component: TicketComponent, canActivate:[AuthGuard] },
  { path: 'message', component: MessageComponent, canActivate:[AuthGuard] },
  { path: 'confirmation', component: ConfirmationComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'status-game', component: StatusGameComponent },

  // { path: '', component: CasesUseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
