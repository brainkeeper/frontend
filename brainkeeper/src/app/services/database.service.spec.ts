import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { StorablePerson } from '../classes/storable-person';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create persons table', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service.persons.name).toBe('persons');
    expect(service.persons.schema.primKey.name).toBe('id');
    expect(service.persons.schema.primKey.auto).toBe(true);
    expect(service.persons.schema.mappedClass).toBe(StorablePerson);
    expect(service.persons.schema.indexes.find(i => i.name === 'name' && !i.auto && !i.unique)).toBeDefined();
    expect(service.persons.count).not.toBe(0);
  });
});
