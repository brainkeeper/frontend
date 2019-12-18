import { Component, OnInit } from '@angular/core';

import { SessionService } from 'src/app/services/session-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public personNames: string[];
  public personPictures: string[];

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
   }

  async startRound(): Promise<void> {
    await this.sessionService.startNextRound().catch();
    this.personNames = this.sessionService.names;
    this.personPictures = this.sessionService.pictures;
  }

  clickedPicture(index: number): void {
    if (this.sessionService.checkPerson(index)) {
      // TODO show correct animation
      this.sessionService.finishRound();
      this.startRound();
    } else {
      // TODO show false animation
    }
  }

}
