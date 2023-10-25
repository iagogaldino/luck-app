import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigAppService {
  linkMap = 'https://maps.app.goo.gl/8XxbJinGfXbWdPJK7';
  token = '';
  flowType = '';
  codeConfirmed = false;
  gameWin = false;
  loginTitle = `<h2>😃 Olá! Seja muito bem-vindo(a)!</h2>
<p>
  🍀 Está pronto para testar a sua sorte hoje? Cadastre-se e tenha a chance
  de ganhar um delicioso espetinho premiado. Se você for um dos sortudos,
  poderá vir desfrutar deste saboroso prêmio! 🍢🏆🎉
</p>`;
  usersWIN = [];
  address = 'Rua Canadá, 83, Maria Goretti Juazeiro-BA';

  itemsLuck = [];

  constructor() {}
}
