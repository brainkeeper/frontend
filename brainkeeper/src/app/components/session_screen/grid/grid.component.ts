import { Component, OnInit } from '@angular/core';

import { SessionService } from 'src/app/services/session-service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private _persons: Person[];

  public get persons() {
    return this._persons;
  }

  constructor(private sessionService: SessionService) { }

  async ngOnInit() {
    await this.startRound();
   }

  async startRound(): Promise<void> {
    await this.sessionService.startNextRound().catch();
    this._persons = this.sessionService.persons;
  }

  async clickedPicture(index: number): Promise<void> {
    if (this.sessionService.checkPerson(index)) {
      this.sessionService.finishRound();
      await this.startRound();
    }
  }
}
