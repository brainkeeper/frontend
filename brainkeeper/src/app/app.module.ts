import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BigPersonCardComponent } from './big-person-card/big-person-card.component';
import {MatCardModule} from '@angular/material/card';
import { PersonsComponent } from './persons/persons.component';
import { PersistentPersonService } from './services/persistent-person.service';
import { PersonService } from './services/person-service';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    BigPersonCardComponent,
    PersonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    { provide: PersonService, useClass: PersistentPersonService },
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
