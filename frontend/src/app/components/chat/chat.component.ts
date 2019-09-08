import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatSession} from "../../model/chatsession";
import {Person} from "../../model/person";
import {WebsocketService} from "../../services/websocket.service";
import {ChatService} from "../../services/chat.service";
import {Operationenum} from "../../model/operationenum";
import {Message} from "../../model/message";
import {Socketmessage} from "../../model/socketmessage";

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
      ChatComponent.participant = new Person("");
      this.webSocketService.connect(ChatComponent.chat, ChatComponent.participant);
        setTimeout(()=> {
            this.join(participantName, room);
        },500);
  }
  }

    private join(participantName: string, room: string) {
        let message: Socketmessage = new Socketmessage(null);
        message.payload = participantName;
        message.operation = Operationenum.JOIN;
        this.webSocketService.join(JSON.stringify(message), room);
    }

    sendMessage(content){
      let sender: Person = new Person(this.getParticipant().name);
      sender.id = this.getParticipant().id;
      sender.imageUrl = this.getParticipant().imageUrl;
    let messageForSending  = new Message(content, sender);
    let messageJSON: string = JSON.stringify(messageForSending);
      let message: Socketmessage = new Socketmessage(null);
      message.payload = messageJSON;
      message.operation = Operationenum.SEND;
    this.webSocketService.sendMessage(JSON.stringify(message), ChatComponent.chat.name);
  }

  getChat(){
      return ChatComponent.chat;
  }
  getParticipant(){
      return ChatComponent.participant;
  }

  getMessages(){
      return ChatComponent.participant.subscribedMessages;
  }

  deleteMessage(message: Message){
      ChatComponent.participant.subscribedMessages = this.getMessages().filter(m => m != message)
  }
}
