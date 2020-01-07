import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/classes/person';
import { Input } from '@angular/core';

@Component({
  selector: 'app-small-person-card',
  templateUrl: './small-person-card.component.html',
  styleUrls: ['./small-person-card.component.scss']
})
export class SmallPersonCardComponent implements OnInit {

  @Input() person: Person;

  constructor() {
  }

  ngOnInit() {
  }
}
