import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../../../../model/person";

@Component({
  selector: 'app-user-msg-image',
  templateUrl: './user-msg-image.component.html',
  styleUrls: ['./user-msg-image.component.css']
})
export class UserMsgImageComponent implements OnInit {

  @Input() participant: Person;
  constructor() { }

  ngOnInit() {
  }

}
