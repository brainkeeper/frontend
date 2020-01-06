import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SmallPersonCardComponent } from './small-person-card.component';
import { Person } from 'src/app/classes/person';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SmallPersonCardComponent', () => {
  let component: SmallPersonCardComponent;
  let fixture: ComponentFixture<SmallPersonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallPersonCardComponent ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule
      ],
      providers: [
        { provide: Location },
        { provide: Router }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallPersonCardComponent);
    component = fixture.componentInstance;
    component.person = new Person('Tatzelwurm', 'TatzelwurmSeinBild');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be no component when person is null', () => {
    fixture.whenStable();
    component.person = null;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    expect(bannerDe.query(By.css('.small-card'))).toBeNull();
  });
  it('should be right picture', () => {
    fixture.whenStable();
    component.person = new Person('Oma', 'src/assets/renter_test.png');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.card>img').src).toContain('src/assets/renter_test.png');
  });
});
