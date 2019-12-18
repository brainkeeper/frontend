import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonNameComponent } from './components/session_screen/person-name/person-name.component';


import { BigPersonCardComponent } from './components/session_screen/big-person-card/big-person-card.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersistentPersonService } from './services/persistent-person.service';
import { PersonService } from './services/person-service';
import { DatabaseService } from './services/database.service';
import { SmallPersonCardComponent } from './components/session_screen/small-person-card/small-person-card.component';
import { SessionService } from './services/session-service';
import { SettingsComponent } from './components/settings/settings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PersonsComponent } from './components/persons/persons.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    BigPersonCardComponent,
    GridComponent,
    PersonNameComponent,
    SmallPersonCardComponent,
    SettingsComponent,
    StatisticsComponent,
    PersonsComponent,
    NavigationBarComponent,
    StartComponent,
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
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
