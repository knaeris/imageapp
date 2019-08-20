import {Component, OnInit} from '@angular/core';
import {ChatSession} from "../../model/chatsession";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
    //encapsulation: ViewEncapsulation.None // <------
})
export class ChatComponent implements OnInit {

  chat:ChatSession;

  constructor() { }

  ngOnInit() {
  }

  getChatFromChild($event){
    this.chat = $event;
  }
}
