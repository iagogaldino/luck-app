import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigAppService {
  token = '';
  flowType = '';
  loginTitle = `<h2>😃 Olá! Seja muito bem-vindo(a)!</h2>
<p>
  🍀 Está pronto para testar a sua sorte hoje? Cadastre-se e tenha a chance
  de ganhar um delicioso espetinho premiado. Se você for um dos sortudos,
  poderá vir desfrutar deste saboroso prêmio! 🍢🏆🎉
</p>`;
  usersWIN = [
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
    { name: 'Iago Delsuc' },
  ];
  address = 'Rua Canadá, 83, Maria Goretti Juazeiro-BA';

  itemsLuck = [
    { id: 1, name: 'Carne' },
    { id: 2, name: 'Frango' },
    { id: 3, name: 'Suíno' },
    { id: 4, name: 'Queijo' },
  ];

  constructor() {}
}
