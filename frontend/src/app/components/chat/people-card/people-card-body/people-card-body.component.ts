import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-people-card-body',
  templateUrl: './people-card-body.component.html',
  styleUrls: ['./people-card-body.component.css']
})
export class PeopleCardBodyComponent implements OnInit {

  @Input() chat: ChatSession;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getYourId(){
    return this.authService.person.id;
  }

}
