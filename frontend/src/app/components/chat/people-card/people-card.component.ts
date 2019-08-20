import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatSession} from "../../../model/chatsession";

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})

export class PeopleCardComponent implements OnInit {
  chat:ChatSession;
  @Output() chatOutPut = new EventEmitter<ChatSession>();

  constructor() { }

  ngOnInit() {
  }

  emit($event){
    this.chat = $event;
    this.chatOutPut.emit(this.chat)
  }
}
