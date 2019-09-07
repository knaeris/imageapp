import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../../services/chat.service";
import {ChatSession} from "../../../../model/chatsession";
import {Person} from "../../../../model/person";
import {Observable} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {WebsocketService} from "../../../../services/websocket.service";
import {Operationenum} from "../../../../model/operationenum";

@Component({
    selector: 'app-people-card-header',
    templateUrl: './people-card-header.component.html',
    styleUrls: ['./people-card-header.component.css']
})
export class PeopleCardHeaderComponent implements OnInit {

    personName: string;
    chatName: string;
    chat$: Observable<ChatSession>;
    chat: ChatSession = new ChatSession("");
    @Output() dataToPass: EventEmitter<any> = new EventEmitter<any>();
    person$: Observable<Person>;


    constructor(private chatService: ChatService,
                private websocketService:WebsocketService,
                private authService:AuthService) {
    }

    ngOnInit() {
    }

    joinChat() {
        if (!(sessionStorage.getItem("X-ID")) || this.chatName != this.chat.name) {
            this.chat$ = this.chatService.join(this.chatName, this.personName);
            this.chat$.subscribe(val => {
                this.chat = <ChatSession>val
                this.emit(this.chat);
                this.authService.session = this.chat;
                this.websocketService.connect(this.chatName);
                setTimeout(()=> {
                    this.websocketService.join(
                        JSON.stringify({
                        'name': this.personName,
                        'operation': Operationenum.JOIN}),
                        this.chatName);
                },500);

            });
        }
    }

    emit(data: any) {
        this.dataToPass.emit(data);
    }

    changeName() {
        let id = parseInt(sessionStorage.getItem("X-ID"));
        this.chat$ = this.chatService.changeName(this.chat.name, this.personName, id);
        this.chat$.subscribe(val => {
            this.chat = <ChatSession>val
            this.emit(this.chat);
        });

    }
}
