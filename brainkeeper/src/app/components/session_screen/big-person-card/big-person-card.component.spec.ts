import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigPersonCardComponent } from './big-person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

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
        MatDialog,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBar,
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
});
