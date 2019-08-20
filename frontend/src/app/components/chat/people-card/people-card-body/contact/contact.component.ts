import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../../../../model/person";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact: Person;

  constructor() { }

  ngOnInit() {
  }

}
