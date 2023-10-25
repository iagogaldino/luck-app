import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { GameComponent } from './components/game/game.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CasesUseComponent } from './components/cases-use/cases-use.component';
import { MessageComponent } from './components/message/message.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: CasesUseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmation', component: ConfirmationComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'game', component: GameComponent, canActivate:[AuthGuard] },
  { path: 'ticket', component: TicketComponent, canActivate:[AuthGuard] },
  { path: 'message', component: MessageComponent, canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
