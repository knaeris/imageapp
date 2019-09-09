import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../../services/chat.service";
import {ChatSession} from "../../../../model/chatsession";
import {Person} from "../../../../model/person";
import {Observable} from "rxjs";
import {WebsocketService} from "../../../../services/websocket.service";
import {Operationenum} from "../../../../model/operationenum";
import {PeopleCardComponent} from "../people-card.component";

@Component({
    selector: 'app-people-card-header',
    templateUrl: './people-card-header.component.html',
    styleUrls: ['./people-card-header.component.css']
})
export class PeopleCardHeaderComponent extends PeopleCardComponent implements OnInit {

    personName: string;
    chatName: string;

    constructor(webSocketService: WebsocketService,
                 chatService: ChatService) {
        super(webSocketService, chatService);
    }
    ngOnInit() {
    }

    joinChat() {
       super.joinChat(this.chatName, this.personName);
       this.chatName = "";
       this.personName = "";
    }

    changeName() {
       /* let id = parseInt(sessionStorage.getItem("X-ID"));
        this.chat$ = this.chatService.changeName(this.chat.name, this.personName, id);
        this.chat$.subscribe(val => {
            this.chat = <ChatSession>val
        });*/

    }
}
