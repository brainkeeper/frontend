import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input()
  showBackButton = false;

  @Input()
  title = null;

  @Output()
  backClicked = new EventEmitter<() => void>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBackClicked() {
    if (this.backClicked.observers.length > 0) {
      this.backClicked.emit(this.goBack.bind(this));
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
