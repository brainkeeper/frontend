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

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.startRound();
  }

  startRound(): void {
    const p = this.sessionService.startNextRound();
    p.then(() => {
        this.personPictures = this.sessionService.names;
        this.personPictures = this.sessionService.pictures;
    }).catch(() => {

    });
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
