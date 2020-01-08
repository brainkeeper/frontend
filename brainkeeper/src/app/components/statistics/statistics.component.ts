import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from '../../services/person-service';
import { Person } from '../../classes/person';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input()
  allPersonsWithScore: Promise<Person[]>;

  constructor(public personService: PersonService) {
  }

  ngOnInit() {
    this.allPersonsWithScore = this.personService.getAllWithScore();
  }
}
