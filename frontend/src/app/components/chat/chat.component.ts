import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
    static hasLeft: boolean = false;

    constructor(protected webSocketService: WebsocketService,
                protected chatService: ChatService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    joinChat(room: string, participantName: string) {
        if (!ChatComponent.chat || (ChatComponent.chat && ChatComponent.chat.name != room)) {
            ChatComponent.chat = new ChatSession(room);
            ChatComponent.participant = new Person("");
            this.webSocketService.connect(ChatComponent.chat, ChatComponent.participant);
            setTimeout(() => {
                this.join(participantName, room);
            }, 501);
        }
    }

    private join(participantName: string, room: string) {
        let message: Socketmessage = new Socketmessage(null);
        message.payload = participantName;
        message.operation = Operationenum.JOIN;
        this.webSocketService.join(JSON.stringify(message), room);
    }

    sendMessage(content) {
        let messageForSending = this.composeMessageForSending(content);
        this.webSocketService.sendMessage(JSON.stringify(messageForSending), ChatComponent.chat.name);
    }

    private composeMessageForSending(content) {
        let sender = this.composeSender();
        let message = new Message(content, sender);
        let messageJSON: string = JSON.stringify(message);
        let messageForSending: Socketmessage = new Socketmessage(null);
        messageForSending.payload = messageJSON;
        messageForSending.operation = Operationenum.SEND;
        return messageForSending;
    }

    private composeSender() {
        let sender: Person = new Person(this.getParticipant().name);
        sender.id = this.getParticipant().id;
        sender.imageUrl = this.getParticipant().imageUrl;
        return sender;
    }

    getChat() {
        return ChatComponent.chat;
    }

    getParticipant() {
        return ChatComponent.participant;
    }

    getMessages() {
        return ChatComponent.participant.subscribedMessages;
    }

    deleteMessage(message: Message) {
        this.webSocketService.delete(this.getChat().name, JSON.stringify(message));
    }

    parsetoDate(timestamp: number) {
        let date = new Date(timestamp)
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        return hours.toString().padStart(2,"0") + ":"
            + minutes.toString().padStart(2,"0") + ":"
            + seconds.toString().padStart(2,"0");
    }

    leave() {
        if (this.getChat() && this.getParticipant()) {
            let sm: Socketmessage = new Socketmessage(null);
            sm.payload = this.getParticipant().name;
            sm.operation = Operationenum.LEAVE;
            this.webSocketService.leave(this.getChat().name, JSON.stringify(sm));
            this.webSocketService.disconnect();
            ChatComponent.chat = null;
            ChatComponent.participant = null;
        }
    }

    @HostListener('window:beforeunload')
   private leaveChatAfterLeavingPage(){
        if(!ChatComponent.hasLeft){
            this.leave();
            ChatComponent.hasLeft = true;
        }
    }

}
