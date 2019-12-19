import { Component, OnInit } from '@angular/core';

import { SessionService } from 'src/app/services/session-service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  chosenPerson: Person;
  show: boolean;
  public personNames: string[];
  public personPictures: string[];
  public isRightPerson = true;

  public get names() {
    return this.personNames;
  }

  public get pictures() {
    return this.personPictures;
  }

  constructor(public sessionService: SessionService) {
    this.personNames = new Array(6);
    this.personPictures = new Array(6);
   }

  async ngOnInit() {
    await this.startRound();
    this.show = false;
   }

  async startRound(): Promise<void> {
    await this.sessionService.startNextRound().catch();
    this.personNames = this.sessionService.names;
    this.personPictures = this.sessionService.pictures;
  }

  clickedPicture(index: number): void {
    this.show = true;
    this.chosenPerson = new Person(this.personNames[index], 'assets/rentner_test.jpg');
    if (this.sessionService.checkPerson(index)) {
      this.isRightPerson = true;
      // TODO show correct animation
      this.sessionService.finishRound();
      this.startRound();
    } else {
      // TODO show false animation
      this.isRightPerson = false;
    }
  }

}
