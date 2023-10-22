import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('moveItems', [
      transition('* => *', [
        animate('5s', keyframes([
          style({ transform: 'translateY(0)' }),
          style({ transform: 'translateY(-100%)' })
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  public usersWin = [
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
    {name: 'Iago Delsuc'},
  ];
  displayItems: any[] = [];
  itemIndex = 0;

  constructor() {

   }

  ngOnInit() {
  }



}
