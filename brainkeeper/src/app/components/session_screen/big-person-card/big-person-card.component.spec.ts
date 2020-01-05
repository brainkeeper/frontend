import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPersonCardComponent } from './big-person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
});
