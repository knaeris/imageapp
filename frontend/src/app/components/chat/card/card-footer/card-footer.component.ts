import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";
import {ChatService} from "../../../../services/chat.service";
import {Message} from "../../../../model/message";
import {Observable} from "rxjs";
import {WebsocketService} from "../../../../services/websocket.service";
import {Person} from "../../../../model/person";
import {Operationenum} from "../../../../model/operationenum";
import {CardComponent} from "../card.component";

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent extends CardComponent implements OnInit {

  @Input() chat: ChatSession;
  content: string;
  message$: Observable<Message>

  constructor(webSocketService: WebsocketService,
              chatService: ChatService) {
    super(webSocketService, chatService);
  }

  ngOnInit() {
  }

  send(){
    super.send(this.content)
  }
}
