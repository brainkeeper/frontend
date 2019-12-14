import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToGame() {
    this.router.navigate(['game']);
  }

  navigateToStatistics() {
    this.router.navigate(['statistics']);
  }

  navigateToPersons() {
    this.router.navigate(['persons']);
  }

  navigateToSettings() {
    this.router.navigate(['settings']);
  }
}
