import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatSession} from "../../model/chatsession";
import {Person} from "../../model/person";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
    //encapsulation: ViewEncapsulation.None // <------
})
export class ChatComponent implements OnInit, OnDestroy {

  session:ChatSession;
  id: number = 0;
  name: string = "";
  person: Person;

  constructor() { }

  ngOnInit() {
  }

  getChatFromChild($event){
    this.session = $event;
  }

  ngOnDestroy(): void {
  }
}
