import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteComponent } from './dialog-confirm-delete.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

describe('DialogConfirmDeleteComponent', () => {
  let component: DialogConfirmDeleteComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogConfirmDeleteComponent,
      ],
      imports: [
        MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
