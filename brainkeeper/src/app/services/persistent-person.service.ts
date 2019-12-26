import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { PersonService } from './person-service';
import { Person } from '../classes/person';
import { StorablePerson } from '../classes/storable-person';

@Injectable({
  providedIn: 'root'
})
export class PersistentPersonService extends PersonService {

  constructor(private dbService: DatabaseService) {
    super();
  }

  getAll(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      this.dbService.persons.toArray().then((persons: StorablePerson[]) => {
        resolve(persons.map(p => p.toPerson()));
      }).catch(error => {
        reject(error);
      });
    });
  }

  getById(id: number): Promise<Person> {
    return new Promise((resolve, reject) => {
      this.dbService.persons.get(id).then((person: StorablePerson) => {
        if (person === undefined) {
          reject();
        } else {
          resolve(person.toPerson());
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  getSixRandom(): Promise<Person[]> {
    return new Promise(async (resolve, reject) => {
      const allPersons = await this.getAll().catch(e => {
        reject(e);
      });
      if (allPersons !== undefined) {
        const shuffled = this.shuffle(allPersons as Person[]);
        resolve(shuffled.slice(0, 6));
      }
    });
  }

  getAllWithScore(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      this.dbService.persons.where('score').above(0).reverse().toArray().then((persons: StorablePerson[]) => {
        resolve(persons.map(p => p.toPerson()));
      }).catch(error => {
        reject(error);
      });
    });
  }

  add(person: Person): Promise<Person> {
    if (person.id != null) {
      return Promise.reject('Id must be null');
    }
    const storablePerson = StorablePerson.fromPerson(person);
    delete storablePerson.id;
    return new Promise((resolve, reject) => {
      this.dbService.persons.add(storablePerson).then((id: number) => {
        person.id = id;
        resolve(person);
      }).catch(error => {
        reject(error);
      });
    });
  }

  remove(id: number): Promise<void> {
    return this.dbService.persons.delete(id);
  }

  update(person: Person): Promise<boolean> {
    if (person.id == null) {
      return Promise.reject('Id must be set');
    }
    return new Promise((resolve, reject) => {
      this.dbService.persons.update(person.id, StorablePerson.fromPerson(person)).then((count: number) => {
        resolve(count !== 0);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Shuffles array in place. ES6 version
   * @param a An array containing the items.
   * See https://stackoverflow.com/a/15717993
   */
  private shuffle(a: Person[]): Person[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
