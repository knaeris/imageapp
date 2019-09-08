import {Injectable} from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Websocketmessage} from "../model/websocketmessage";
import {Operationenum} from "../model/operationenum";
import {Message} from "../model/message";
import {Person} from "../model/person";
import {isJsObject} from "@angular/core/src/change_detection/change_detection_util";
import {ChatService} from "./chat.service";
import {Observable} from "rxjs";
import {ChatSession} from "../model/chatsession";

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

    onMessageReceived(message: string, room: ChatSession, participant: Person) {
        console.log("Message Recieved from Server :: " + message);

        let obj: any  = JSON.parse(message);
        switch (obj.operation) {
            case Operationenum.JOIN:
                if (!participant.id){
                    participant.id = obj.id;
                    participant.imageUrl = obj.imageUrl;
                }
                this.getAllParticipants(room);
                break;
            case Operationenum.SEND :
                participant.subscribedMessages.push(obj)
                break;
        }
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


    private getAllParticipants(room){
        let ppl$:Observable<Person[]> = this.chatService.getParticipantsOf(room.name);
         let ppl = ppl$.subscribe(value  => {
             room.participants =[];
             for(let b of value){
                 let bb =new Person(b.name);
                 bb.id = b.id;
                 bb.imageUrl = b.imageUrl;
                 room.participants.push(bb);
             }
         })
        setTimeout(()=>{
            ppl.unsubscribe();
        },100)
    }
}