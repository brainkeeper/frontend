import { Person } from '../classes/person';
import Dexie from 'dexie';
import { StorablePerson } from '../classes/storable-person';
import { SessionService } from './session-service';
import * as TypeMoq from 'typemoq';
import { PersonService } from './person-service';
import { PersistentPersonService } from './persistent-person.service';

describe('SessionService', () => {

    let personServiceMock: TypeMoq.IMock<PersonService>;

    const persons = [
        new StorablePerson(1, 'John Doe', 'a').toPerson(),
        new StorablePerson(2, 'Wolfram Diggibert', 'b').toPerson(),
        new StorablePerson(3, 'Max Mustermann', 'c').toPerson(),
        new StorablePerson(4, 'Herr Mann', 'd').toPerson(),
        new StorablePerson(5, 'Timotäus Tomatimus', 'e').toPerson(),
        new StorablePerson(6, 'Marlene Dietrich', 'f').toPerson(),
    ];

    beforeEach(() => {
        personServiceMock = TypeMoq.Mock.ofType<PersistentPersonService>(PersistentPersonService);
        personServiceMock.setup(s => s.getSixRandom()).returns(() => Dexie.Promise.resolve(persons));
        personServiceMock.setup(s => s.getAll()).returns(() => Dexie.Promise.resolve(persons));
        personServiceMock.setup(s => s.getAllWithScore()).returns((a) => {
            if (a === 1) {
                return Dexie.Promise.resolve([persons[0]]);
            } else {
                return Dexie.Promise.resolve([persons[1]]);
            }
        });
        personServiceMock.setup(s => s.getAll()).returns(() => Dexie.Promise.resolve(persons));
    });

    describe('ctor', () => {
        it('creates with round 0', () => {
            const sessionService = new SessionService(personServiceMock.object);
            expect(sessionService.round).toBe(0);
        });

        it('creates without persons', () => {
            const sessionService = new SessionService(personServiceMock.object);
            expect(() => sessionService.correctPerson).toThrowError('Round must be started before a person is selected!');
            expect(() => sessionService.persons).toThrowError('Round must be started before persons is selected!');
            expect(() => sessionService.pictures).toThrowError('Round must be started before persons is selected!');
        });
    });

    describe('getter', () => {
        it('', () => {

        });

        it('', () => {

        });

        it('', () => {

        });

        it('', () => {

        });
    });

    describe('start round', () => {
        it('increases round number', () => {
            const sessionService = new SessionService(personServiceMock.object);
            sessionService.startNextRound();
            expect(sessionService.round).toBe(1);
            sessionService.startNextRound();
            expect(sessionService.round).toBe(2);
        });

        it('selects six random people', () => {
            const sessionService = new SessionService(personServiceMock.object);
            sessionService.startNextRound();
            expect(sessionService.persons.length).toBe(6);
            expect(sessionService.persons).toBe(persons);
        })
    });

    describe('check person', () => {
        it('', () => {

        });
    });
});
