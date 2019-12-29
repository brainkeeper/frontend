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
// npm install ng2-img-max blueimp-canvas-to-blob --save
import { Ng2ImgMaxModule } from 'ng2-img-max';
// npm install ng2-pica --save
import { Ng2PicaModule } from 'ng2-pica';
// npm install --save-dev @types/node
import * as FS from 'fs';

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
    Ng2ImgMaxModule,
    Ng2PicaModule,
  ],
  providers: [
    { provide: PersonService, useClass: PersistentPersonService, },
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
