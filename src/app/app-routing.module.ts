import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { GameComponent } from './components/game/game.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'game', component: GameComponent },
  { path: 'ticket', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
