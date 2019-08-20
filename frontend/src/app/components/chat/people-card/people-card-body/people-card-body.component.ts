import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";

@Component({
  selector: 'app-people-card-body',
  templateUrl: './people-card-body.component.html',
  styleUrls: ['./people-card-body.component.css']
})
export class PeopleCardBodyComponent implements OnInit {

  @Input() chat: ChatSession;

  constructor() { }

  ngOnInit() {
  }

}
