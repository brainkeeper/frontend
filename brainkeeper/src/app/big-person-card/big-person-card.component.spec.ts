import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPersonCardComponent } from './big-person-card.component';

describe('BigPersonCardComponent', () => {
  let component: BigPersonCardComponent;
  let fixture: ComponentFixture<BigPersonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigPersonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
