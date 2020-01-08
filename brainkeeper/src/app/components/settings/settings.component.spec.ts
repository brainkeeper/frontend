import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { SettingsComponent } from './settings.component';
import { Router } from '@angular/router';


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent,
        NavigationBarComponent,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
