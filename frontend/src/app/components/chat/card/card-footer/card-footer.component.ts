import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";
import {ChatService} from "../../../../services/chat.service";
import {Message} from "../../../../model/message";
import {Observable} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {WebsocketService} from "../../../../services/websocket.service";
import {Person} from "../../../../model/person";

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {

  @Input() chat: ChatSession;
  content: string;
  message$: Observable<Message>

  constructor(private chatService: ChatService,
              public websocketService: WebsocketService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  send(){
    let sender: Person = this.authService.person;
    let messageJSON: string = JSON.stringify(new Message(this.content, sender))
    //console.log()
    this.websocketService.sendMessage(messageJSON);
    //this.message$.subscribe( x => this.authService.person.subscribedMessages.add(x));
  }
}
