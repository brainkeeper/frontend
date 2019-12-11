import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonNameComponent } from './components/session_screen/person-name/person-name.component';


import { BigPersonCardComponent } from './big-person-card/big-person-card.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersistentPersonService } from './services/persistent-person.service';
import { PersonService } from './services/person-service';
import { DatabaseService } from './services/database.service';
import { SmallPersonCardComponent } from './components/session_screen/small-person-card/small-person-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BigPersonCardComponent,
    GridComponent,
    PersonNameComponent,
    SmallPersonCardComponent,

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
    { provide: PersonService, useClass: PersistentPersonService, },
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
