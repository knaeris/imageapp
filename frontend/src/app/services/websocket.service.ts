import {Injectable} from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AuthService} from "./auth.service";
import {Message} from "../model/message";

@Injectable()
export class WebsocketService{
   private serverUrl = 'http://localhost:8080/socket';
   private stompClient;
   private channel = "/chat";

   constructor(private authServ: AuthService){

   }

   connect() {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, (frame)=> {
            that.stompClient.subscribe(that.channel, (event) => {
                that.onMessagereceived(event.body);
            });
        }, this.errorCb)
    };

    onMessagereceived(message) {
        console.log("Message Recieved from Server :: " + message);
        this.authServ.person.subscribedMessages.add(JSON.parse(message))
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    errorCb(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    sendMessage(message) {
        this.stompClient.send("/app/send/message", {}, message);
    }
}