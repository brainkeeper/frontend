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

  it('should display the wrong name, with red border', async () => {
    fixture.whenStable();
    component.chosenPerson = new Person('Hulu-Zulu', 'Bild von HuluZulu');
    component.isRight = false;
    component.show = true;
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toEqual(`No, that's Hulu-Zulu! Please try again.`);
    expect(fixture.debugElement.query(By.css('.big-card.right'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.big-card.wrong'))).toBeTruthy();
  });

  it('should display the right name, with green border', async () => {
    fixture.whenStable();
    component.chosenPerson = new Person('Hulu-Zulu', 'Bild von HuluZulu');
    component.isRight = true;
    component.show = true;
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toEqual(`Yes, that's Hulu-Zulu!`);
    expect(fixture.debugElement.query(By.css('.big-card.right'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.big-card.wrong'))).toBeNull();
  });
});
