import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPersonCardComponent } from './small-person-card.component';

describe('SmallPersonCardComponent', () => {
  let component: SmallPersonCardComponent;
  let fixture: ComponentFixture<SmallPersonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallPersonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
