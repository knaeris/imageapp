import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../model/message";
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'app-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.css']
})
export class MyMessageComponent implements OnInit {

  @Input() message: Message;
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  deletes(){
    this.authService.person.subscribedMessages.filter(message => message != this.message);
  }

}
