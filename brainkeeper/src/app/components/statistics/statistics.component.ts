import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../services/person-service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(public personService: PersonService) { }

  ngOnInit() {
  }

}
