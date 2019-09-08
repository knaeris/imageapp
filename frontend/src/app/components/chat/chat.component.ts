import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ChatSession} from "../../model/chatsession";
import {Person} from "../../model/person";
import {WebsocketService} from "../../services/websocket.service";
import {ChatService} from "../../services/chat.service";
import {Operationenum} from "../../model/operationenum";
import {Observable} from "rxjs";
import {Message} from "../../model/message";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
    //encapsulation: ViewEncapsulation.None // <------
})
export class ChatComponent implements OnInit, OnDestroy {

   static chat: ChatSession;
   static participant: Person;

  constructor(protected webSocketService: WebsocketService,
              protected chatService: ChatService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  joinChat(room: string, participantName: string) {
      if(!ChatComponent.chat || ChatComponent.chat.name != room){
      ChatComponent.chat = new ChatSession(room);
      ChatComponent.participant = new Person(participantName)
      this.webSocketService.connect(ChatComponent.chat, ChatComponent.participant);
        setTimeout(()=> {
          this.webSocketService.join(
              JSON.stringify({
                'name': participantName,
                'operation': Operationenum.JOIN}),
              room);
        },500);
  }
  }

  send(content){
    let messageForSending  = new Message(content, ChatComponent.participant, Operationenum.SEND);
    let messageJSON: string = JSON.stringify(messageForSending)
    this.webSocketService.sendMessage(messageJSON, ChatComponent.chat.name);
  }

  getChat(){
      return ChatComponent.chat;
  }
  getParticipant(){
      return ChatComponent.participant;
  }

  deleteMessage(message: Message){
      ChatComponent.participant.subscribedMessages = ChatComponent.participant.subscribedMessages.filter(m => m != message)
  }
}
