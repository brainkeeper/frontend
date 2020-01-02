import { Component, OnInit } from '@angular/core';

import { SessionService } from 'src/app/services/session-service';

@Component({
  selector: 'app-person-name',
  templateUrl: './person-name.component.html',
  styleUrls: ['./person-name.component.scss']
})
export class PersonNameComponent implements OnInit {

  constructor(public sesionservice: SessionService) { }

  ngOnInit() {
  }

  public get name() {
    if (this.sesionservice.round === 0) {
      return '';
    }
    return this.sesionservice.correctPersonName;
  }
}
