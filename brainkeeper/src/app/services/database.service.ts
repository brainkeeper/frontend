import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { StorablePerson } from '../classes/storable-person';
import * as persons from '../../assets/people.json';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: Dexie;

  constructor() {
    this.db = new Dexie('BrainKeerDB');
    this.db.version(1).stores({
      persons: '++id, name'
    });
    this.db.table('persons').mapToClass(StorablePerson);

    this.db.on('populate', () => {
        this.db.table('persons').bulkAdd(persons.persons);
    });
  }

  public get persons(): Dexie.Table<StorablePerson, number> {
    return this.db.table('persons');
  }
}
