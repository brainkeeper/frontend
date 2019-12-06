import Dexie from 'dexie';
import * as TypeMoq from 'typemoq';
import { Person } from '../classes/person';
import { StorablePerson } from '../classes/storable-person';
import { DatabaseService } from './database.service';
import { PersistentPersonService } from './persistent-person.service';
import { PersonService } from './person-service';


describe('PersistentPersonService', () => {

  let service: PersonService;
  let tableMock: TypeMoq.IMock<Dexie.Table<StorablePerson, number>>;
  let dbServiceMock: TypeMoq.IMock<DatabaseService>;

  const storablePersons = [
    new StorablePerson(1, 'Jon Doe', 'abc'),
    new StorablePerson(2, 'Jane Doe', 'bcd')
  ];

  beforeEach(() => {
    dbServiceMock = TypeMoq.Mock.ofType<DatabaseService>(DatabaseService);
    service = new PersistentPersonService(dbServiceMock.object);
    tableMock = TypeMoq.Mock.ofType<Dexie.Table<StorablePerson, number>>();
    dbServiceMock.setup(s => s.persons).returns(() => tableMock.object);
  });

  describe('getAll', () => {
    it('resolves with a Person[]', async () => {
      tableMock.setup(x => x.toArray()).returns(() => Dexie.Promise.resolve(storablePersons));

      const persons = await service.getAll();
      expect(persons.length).toBe(2);
      storablePersons.forEach(s => {
        const person = persons.find(p => p.id === s.id);
        expect(person.name).toBe(s.name);
        expect(person.picture).toBe(s.picture);
      });
      tableMock.verify(x => x.toArray(), TypeMoq.Times.once());
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      tableMock.setup(x => x.toArray()).returns(() => Dexie.Promise.reject(error));

      const persons = await service.getAll().catch(e => {
        expect(e).toBe(error);
      });
      expect(persons).toBeUndefined();
    });
  });

  describe('getById', () => {
    it('resolves with a Person', async () => {
      tableMock.setup(x => x.get(1)).returns(() => Dexie.Promise.resolve(storablePersons[0]));

      const person = await service.getById(1);
      expect(person.name).toBe(storablePersons[0].name);
      expect(person.picture).toBe(storablePersons[0].picture);
      tableMock.verify(x => x.get(1), TypeMoq.Times.once());
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      tableMock.setup(x => x.get(1)).returns(() => Dexie.Promise.reject(error));

      const person = await service.getById(1).catch(e => {
        expect(e).toBe(error);
      });
      expect(person).toBeUndefined();
    });
  });

  describe('getSixRandom', () => {
    it('resolves with six random persons', async () => {
      const all = [
        new StorablePerson(1, '1', '1'),
        new StorablePerson(2, '2', '2'),
        new StorablePerson(3, '3', '3'),
        new StorablePerson(4, '4', '4'),
        new StorablePerson(5, '5', '5'),
        new StorablePerson(6, '6', '6'),
        new StorablePerson(7, '7', '7'),
        new StorablePerson(8, '8', '8'),
        new StorablePerson(9, '9', '9'),
        new StorablePerson(10, '10', '10'),
      ];

      tableMock.setup(x => x.toArray()).returns(() => Dexie.Promise.resolve(all));

      const persons1 = await service.getSixRandom();
      const persons2 = await service.getSixRandom();
      const persons3 = await service.getSixRandom();

      expect(persons1.length).toBe(6);
      expect(persons2.length).toBe(6);
      expect(persons3.length).toBe(6);

      expect(persons1).not.toEqual(persons2);
      expect(persons1).not.toEqual(persons3);
      expect(persons2).not.toEqual(persons3);
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      tableMock.setup(x => x.toArray()).returns(() => Dexie.Promise.reject(error));

      const persons = await service.getSixRandom().catch(e => {
        expect(e).toBe(error);
      });
      expect(persons).toBeUndefined();
    });
  });

  describe('getAllWithScore', () => {
    it('resolves with all Persons with a score greater zero descending', async () => {
      const whereClause = TypeMoq.Mock.ofType<Dexie.WhereClause<StorablePerson, number>>();
      const collection = TypeMoq.Mock.ofType<Dexie.Collection<StorablePerson, number>>();
      collection.setup(x => x.reverse()).returns(() => collection.object);
      collection.setup(x => x.toArray()).returns(() => Dexie.Promise.resolve([
        new StorablePerson(1, 'Jon Doe', 'abc', 5),
        new StorablePerson(2, 'Jon Doe', 'abc', 4),
        new StorablePerson(3, 'Jon Doe', 'abc', 3),
      ]));
      whereClause.setup(x => x.above(0)).returns(() => collection.object);
      tableMock.setup(x => x.where('score')).returns(() => whereClause.object);

      const persons = await service.getAllWithScore();
      expect(persons.length).toBe(3);
      expect(persons[0].id).toBe(1);
      expect(persons[1].id).toBe(2);
      expect(persons[2].id).toBe(3);
      tableMock.verify(x => x.where('score'), TypeMoq.Times.once());
      whereClause.verify(x => x.above(0), TypeMoq.Times.once());
      collection.verify(x => x.reverse(), TypeMoq.Times.once());
      collection.verify(x => x.toArray(), TypeMoq.Times.once());
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      const whereClause = TypeMoq.Mock.ofType<Dexie.WhereClause<StorablePerson, number>>();
      const collection = TypeMoq.Mock.ofType<Dexie.Collection<StorablePerson, number>>();
      collection.setup(x => x.reverse()).returns(() => collection.object);
      collection.setup(x => x.toArray()).returns(() => Dexie.Promise.reject(error));
      whereClause.setup(x => x.above(0)).returns(() => collection.object);
      tableMock.setup(x => x.where('score')).returns(() => whereClause.object);

      const person = await service.getAllWithScore().catch(e => {
        expect(e).toBe(error);
      });
      expect(person).toBeUndefined();
    });
  });

  describe('add', () => {
    it('resolves with a Person', async () => {
      const newPerson = new Person('Tester', '111');
      tableMock.setup(x => x.add(StorablePerson.fromPerson(newPerson))).returns(() => Dexie.Promise.resolve(3));

      const person = await service.add(newPerson);
      expect(person.id).toBe(3);
      expect(person.name).toBe(newPerson.name);
      expect(person.picture).toBe(newPerson.picture);
    });

    it('rejects when person\'s id is set', async () => {
      const newPerson = new Person('Tester', '111', 4);
      const person = await service.add(newPerson).catch(e => {
        expect(e).toBe('Id must be null');
      });
      expect(person).toBeUndefined();
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      const newPerson = new Person('Tester', '111');
      tableMock.setup(x => x.add(StorablePerson.fromPerson(newPerson))).returns(() => Dexie.Promise.reject(error));

      const person = await service.add(newPerson).catch(e => {
        expect(e).toBe(error);
      });
      expect(person).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('resolves with void', async () => {
      tableMock.setup(x => x.delete(1)).returns(() => Dexie.Promise.resolve());

      await service.remove(1);
      tableMock.verify(x => x.delete(1), TypeMoq.Times.once());
      expect(1).toBe(1); // Check is verify above
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      tableMock.setup(x => x.delete(1)).returns(() => Dexie.Promise.reject(error));

      await service.remove(1).catch(e => {
        expect(e).toBe(error);
      });
    });
  });

  describe('update', () => {
    it('resolves with true when updated', async () => {
      const updatedPerson = new Person('Tester', '111', 1);
      tableMock.setup(x => x.update(1, StorablePerson.fromPerson(updatedPerson))).returns(() => Dexie.Promise.resolve(1));

      const updated = await service.update(updatedPerson);
      expect(updated).toBe(true);
      tableMock.verify(x => x.update(1, StorablePerson.fromPerson(updatedPerson)), TypeMoq.Times.once());
    });

    it('resolves with false when not updated', async () => {
      const updatedPerson = new Person('Tester', '111', 1);
      tableMock.setup(x => x.update(1, StorablePerson.fromPerson(updatedPerson))).returns(() => Dexie.Promise.resolve(0));

      const updated = await service.update(updatedPerson);
      expect(updated).toBe(false);
      tableMock.verify(x => x.update(1, StorablePerson.fromPerson(updatedPerson)), TypeMoq.Times.once());
    });

    it('rejects with error', async () => {
      const error = new Error('Test error');
      const updatedPerson = new Person('Tester', '111', 1);
      tableMock.setup(x => x.update(1, StorablePerson.fromPerson(updatedPerson))).returns(() => Dexie.Promise.reject(error));

      const updated = await service.update(updatedPerson).catch(e => {
        expect(e).toBe(error);
      });
      expect(updated).toBeUndefined();
    });

    it('rejects when person\'s id is not set', async () => {
      const updatedPerson = new Person('Tester', '111');
      const updated = await service.update(updatedPerson).catch(e => {
        expect(e).toBe('Id must be set');
      });
      expect(updated).toBeUndefined();
    });
  });
});
