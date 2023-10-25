import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private _route: ActivatedRoute) {
    this._route.queryParams.subscribe(params => {
      const chave = params['chave'];
      // Faça algo com o valor da chave
      console.log(chave)
    });
   }

  ngOnInit() {
  }

}
