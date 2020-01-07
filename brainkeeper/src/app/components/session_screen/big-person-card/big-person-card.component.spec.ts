import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPersonCardComponent } from './big-person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Person } from 'src/app/classes/person';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BigPersonCardComponent', () => {
  let component: BigPersonCardComponent;
  let fixture: ComponentFixture<BigPersonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigPersonCardComponent ],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
      ]
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
  it('should make clicked true', async () => {
    component.close();
    expect(component.clicked).toBe(true);
    expect(component.show).toBe(false);
  });
  it('should make clicked false', async () => {
    component.clicked = true;
    component.open();
    expect(component.clicked).toBe(false);
    expect(component.show).toBe(true);
  });
  it('should make frame green', async () => {
    fixture.whenStable();
    component.chosenPerson = new Person('Hulu-Zulu', 'Bild von HuluZulu');
    component.isRight = true;
    component.show = true;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    expect(bannerDe.query(By.css('.big-card-wrong'))).toBeNull();
    expect(bannerDe.query(By.css('.big-card-right'))).toBeTruthy();
  });
  it('should make frame red', async () => {
    fixture.whenStable();
    component.chosenPerson = new Person('Hulu-Zulu', 'Bild von HuluZulu');
    component.isRight = false;
    component.show = true;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    expect(bannerDe.query(By.css('.big-card-right'))).toBeNull();
    expect(bannerDe.query(By.css('.big-card-wrong'))).toBeTruthy();
  });
  it('should make be right name', async () => {
    fixture.whenStable();
    component.chosenPerson = new Person('Hulu-Zulu', 'Bild von HuluZulu');
    component.isRight = false;
    component.show = true;
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const title = bannerElement.querySelector('mat-card-title');
    expect(title.textContent).toEqual('Hulu-Zulu');
  });
});
