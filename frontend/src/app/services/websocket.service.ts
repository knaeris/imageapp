import {Injectable} from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Operationenum} from "../model/operationenum";
import {Message} from "../model/message";
import {Person} from "../model/person";
import {ChatService} from "./chat.service";
import {Observable} from "rxjs";
import {ChatSession} from "../model/chatsession";
import {ResponseReader} from "../model/responseReader";

@Injectable()
export class WebsocketService {
    private serverUrl = 'http://localhost:8080/socket';
    /*'http://134.209.21.45:8080/talk-0.0.1-SNAPSHOT/socket';*/
    private stompClient;
    private channel = "/chat/";

    constructor(private chatService: ChatService) {
    }

    connects(room: ChatSession, participant: Person, callback) {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        //this.stompClient.debug = null
        const that = this;
        this.stompClient.connect({}, (frame) => {
            that.stompClient.subscribe(that.channel + room.name, (message) => {
                that.processResponsesByOperation(new ResponseReader(message.body), room, participant);
            });
            if(callback){
                callback();
            }
        }, this.errorCb);
    };

    processResponsesByOperation(response: ResponseReader, room: ChatSession, currentUser: Person) {
        console.log("Message Recieved from Server :: " + response);
        switch (response.operation) {
            case Operationenum.JOIN:
                this.populateLocalUserWithData(currentUser, response);
                this.sendHasJoinedSystemMessage(response, currentUser);
                this.populateParticipantsOf(room);
                break;
            case Operationenum.SEND :
                this.convertResponseToSystemMessageForSending(response, currentUser);
                break;
            case Operationenum.DELETE:
                this.deleteMessage(response,currentUser);
                break;
            case Operationenum.EXCEPTION :

                break;
            case Operationenum.LEAVE :
                this.sendHasLeftSystemMessage(response, currentUser);
                this.populateParticipantsOf(room);
                break;
        }
    }

    private sendHasJoinedSystemMessage(response: ResponseReader, currentUser: Person) {
        let responseContainsMessageObject: boolean = response.payload.timeStamp;
        if (responseContainsMessageObject) {
            let joiningResponse: ResponseReader = this.modifyResponse(response, 'liitus ruumiga');
            this.convertResponseToSystemMessageForSending(joiningResponse, currentUser);
        }
    }

    private sendHasLeftSystemMessage(wsMessage: ResponseReader, currentUser: Person) {
        let leavingResponse: ResponseReader = this.modifyResponse(wsMessage, 'lahkus ruumist');
        this.convertResponseToSystemMessageForSending(leavingResponse, currentUser);
    }

    private convertResponseToSystemMessageForSending(response: ResponseReader, currentUser: Person) {
        let message: Message = this.convertToMessage(response);
        currentUser.subscribedMessages.push(message);
    }

    private populateLocalUserWithData(currentUser: Person, wsMessage: ResponseReader) {
        if (!currentUser.id) {
            let person: Person = wsMessage.payload;
            currentUser.name = person.name;
            currentUser.id = person.id;
            currentUser.imageUrl = person.imageUrl;
        }
    }

    private modifyResponse(response: ResponseReader, action: string):ResponseReader {
        let system: null = null;
        if (response.payload.hasOwnProperty("sender") && response.payload.sender == system) {
            response.payload.payload += " " + action;
            return response;
        }
        return response;
    }

    private convertToMessage(response: ResponseReader): Message {
            let message: Message = new Message(response.payload.payload, response.payload.sender);
            response.payload.timeStamp ? message.timeStamp = response.payload.timeStamp: (doNothing) => ({});
            return message;
        }


    private deleteMessage(wsMessage: ResponseReader, participant: Person){
        let message: Message = wsMessage.payload as Message;
        participant.subscribedMessages = participant.subscribedMessages.filter(m => m.timeStamp != message.timeStamp);
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
        this.stompClient.send("/app/send/" + room, {}, message);
    }

    join(newPerson, room: string) {
        this.stompClient.send("/app/join/" + room, {}, newPerson);
    }

    leave(room, name) {
        this.stompClient.send("/app/leave/" + room, {}, name);
    }

    delete(room, message){
        this.stompClient.send("/app/delete/" + room, {}, message);
    }

    private populateParticipantsOf(room) {
        let ppl$: Observable<Person[]> = this.chatService.getParticipantsOf(room.name);
        let ppl = ppl$.subscribe(value => {
            room.participants = value;
        });
        setTimeout(() => {
            ppl.unsubscribe();
        }, 100)
    }
}