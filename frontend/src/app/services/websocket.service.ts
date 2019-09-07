import {Injectable} from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AuthService} from "./auth.service";
import {Websocketmessage} from "../model/websocketmessage";
import {Operationenum} from "../model/operationenum";
import {Message} from "../model/message";
import {Person} from "../model/person";
import {isJsObject} from "@angular/core/src/change_detection/change_detection_util";
import {ChatService} from "./chat.service";
import {Observable} from "rxjs";

@Injectable()
export class WebsocketService{
   private serverUrl = 'http://localhost:8080/socket';
   private stompClient;
   private channel = "/chat/";

   constructor(private authServ: AuthService, private chatService: ChatService){

   }

   connect(room) {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, (frame)=> {
            that.stompClient.subscribe(that.channel + room, (event) => {
                that.onMessageReceived(event.body);
            });
        }, this.errorCb);
    };

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);

        let obj: any  = JSON.parse(message);
        switch (obj.operation) {
            case Operationenum.JOIN:
                this.changeMyName(obj);
                break;
            case Operationenum.SEND :
                this.authServ.person.subscribedMessages.push(JSON.parse(message))
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
            this.connect(room);
        }, 5000);
    }

    sendMessage(message, room: string) {
        this.stompClient.send("/app/send/message/" + room, {}, message);
    }
    join(newPerson, room: string) {
        this.stompClient.send("/app/join/" + room, {}, newPerson);
    }


    private changeMyName(obj){
        let ppl$:Observable<Person[]> = this.chatService.getParticipantsOf(this.authServ.session.name);
         let ppl = ppl$.subscribe(value  => {
             this.authServ.session.participants =[];
             for(let b of value){
                 let bb =new Person(b.id, b.name);
                 bb.imageUrl = b.imageUrl
                 this.authServ.session.participants.push(bb);
             }
         })
        setTimeout(()=>{
            ppl.unsubscribe();
        },100)
    }
}