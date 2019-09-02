import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.css']
})
export class CardBodyComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  getId(){
    return this.authService.getId();
  }
}
