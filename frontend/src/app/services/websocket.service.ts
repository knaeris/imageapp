import {Injectable} from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Operationenum} from "../model/operationenum";
import {Message} from "../model/message";
import {Person} from "../model/person";
import {ChatService} from "./chat.service";
import {Observable} from "rxjs";
import {ChatSession} from "../model/chatsession";
import {Socketmessage} from "../model/socketmessage";

@Injectable()
export class WebsocketService {
    private serverUrl = 'http://localhost:8080/socket';
    private stompClient;
    private channel = "/chat/";

    constructor(private chatService: ChatService) {

    }

    connect(room: ChatSession, participant: Person) {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, (frame) => {
            that.stompClient.subscribe(that.channel + room.name, (message) => {
                that.onMessageReceived(message.body, room, participant);
            });
        }, this.errorCb);
    };

    onMessageReceived(message: string, room: ChatSession, currentUser: Person) {
        console.log("Message Recieved from Server :: " + message);
        let wsMessage: Socketmessage = new Socketmessage(message);
        switch (wsMessage.operation) {
            case Operationenum.JOIN:
                if (!currentUser.id) {
                    this.composeCurrentUser(wsMessage, currentUser);
                }
                this.getAllParticipants(room);
                break;
            case Operationenum.SEND :
                this.pushToMessages(wsMessage, currentUser);
                break;
            case Operationenum.DELETE:

                break;
            case Operationenum.EXCEPTION :

                break;
            case Operationenum.LEAVE :
                if (wsMessage.payload.payload == currentUser.name) {
                    this.leaveChat(room, currentUser);
                } else {
                    wsMessage.payload.payload += " lahkus ruumist";
                    this.pushToMessages(wsMessage, currentUser);
                    this.getAllParticipants(room);
                }
                break;
        }
    }

    private leaveChat(room: ChatSession, currentUser: Person) {
        room.name = null;
        room.participants = [];
        currentUser.name = null;
        currentUser.id = null;
        currentUser.imageUrl = null;
        currentUser.subscribedMessages = [];
    }

    private composeCurrentUser(wsMessage: Socketmessage, currentUser: Person) {
        let person: Person = wsMessage.payload;
        currentUser.name = person.name;
        currentUser.id = person.id;
        currentUser.imageUrl = person.imageUrl;
    }

    private pushToMessages(wsMessage: Socketmessage, participant: Person) {
        let message: Message = new Message(wsMessage.payload.payload, wsMessage.payload.sender);
        message.timeStamp = wsMessage.payload.timeStamp;
        participant.subscribedMessages.push(message);
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    errorCb(error, room) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            // this.connect(room);
        }, 5000);
    }

    sendMessage(message, room: string) {
        this.stompClient.send("/app/send/message/" + room, {}, message);
    }

    join(newPerson, room: string) {
        this.stompClient.send("/app/join/" + room, {}, newPerson);
    }

    leave(room, name) {
        this.stompClient.send("/app/leave/" + room, {}, name);
    }


    private getAllParticipants(room) {
        let ppl$: Observable<Person[]> = this.chatService.getParticipantsOf(room.name);
        let ppl = ppl$.subscribe(value => {
            room.participants = value;
        });
        setTimeout(() => {
            ppl.unsubscribe();
        }, 100)
    }
}