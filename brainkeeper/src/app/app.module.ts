import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonNameComponent } from './components/session_screen/person-name/person-name.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersistentPersonService } from './services/persistent-person.service';
import { PersonService } from './services/person-service';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PersonNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    { provide: PersonService, useClass: PersistentPersonService, },
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
