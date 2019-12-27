import { StorablePerson } from '../classes/storable-person';
import { SessionService } from './session-service';
import * as TypeMoq from 'typemoq';
import { PersonService } from './person-service';
import { PersistentPersonService } from './persistent-person.service';

describe('SessionService', () => {

    let personServiceMock: TypeMoq.IMock<PersonService>;
    let startedService: SessionService;

    const persons = [
        new StorablePerson(1, 'John Doe', 'a').toPerson(),
        new StorablePerson(2, 'Wolfram Diggibert', 'b').toPerson(),
        new StorablePerson(3, 'Max Mustermann', 'c').toPerson(),
        new StorablePerson(4, 'Herr Mann', 'd').toPerson(),
        new StorablePerson(5, 'Timotäus Tomatimus', 'e').toPerson(),
        new StorablePerson(6, 'Marlene Dietrich', 'f').toPerson(),
    ];

    beforeEach(async () => {
        personServiceMock = TypeMoq.Mock.ofType<PersistentPersonService>(PersistentPersonService);
        personServiceMock.setup(s => s.getSixRandom()).returns(() => new Promise((resolve, reject) => {
            resolve(persons);
        }));
        startedService = new SessionService(personServiceMock.object);
        await startedService.startNextRound();
    });


    describe('ctor', () => {
        it('creates with round 0', () => {
            const sessionService = new SessionService(personServiceMock.object);
            expect(sessionService.round).toBe(0);
        });

        it('creates without persons', () => {
            const sessionService = new SessionService(personServiceMock.object);
            expect(() => sessionService.correctPerson).toThrowError('Round must be started before a person is selected!');
            expect(() => sessionService.persons).toThrowError('Round must be started before persons are selected!');
            expect(() => sessionService.pictures).toThrowError('Round must be started before persons are selected!');
        });
    });

    describe('getter', () => {
        it('gets the round number', () => {
            const sessionService = new SessionService(personServiceMock.object);
            expect(sessionService.round).toBeDefined();
            expect(sessionService.round).toBe(0);
        });

        it('gets the correct person after one is selected', () => {
            expect(startedService.correctPerson).toBeDefined();
        });

        it('gets the name of the correct person after one is selected', () => {
            expect(startedService.correctPersonName).toBeDefined();
            expect(startedService.correctPersonName).toEqual(startedService.correctPerson.name);
        });

        it('gets the pictures of the selected persons after they are selected', () => {
            expect(startedService.names).toBeDefined();
            expect(startedService.names).toEqual(persons.map(p => p.name));
        });

        it('gets the names of the selected persons after they are selected', () => {
            expect(startedService.pictures).toBeDefined();
            expect(startedService.pictures).toEqual(persons.map(p => p.picture));
        });
    });

    describe('start round', () => {
        it('increases round number', async () => {
            expect(startedService.round).toBe(1);
            await startedService.startNextRound();
            expect(startedService.round).toBe(2);
        });

        it('selects six random people', () => {
            expect(startedService.persons.length).toBe(6);
            expect(startedService.persons).toBe(persons);
        });

        it('throws when receiving an error', async () => {
            const pMock = TypeMoq.Mock.ofType<PersistentPersonService>(PersistentPersonService);
            pMock.setup(s => s.getSixRandom()).returns(() => Promise.reject(new Error('No persons for you')));
            const sessionService = new SessionService(pMock.object);
            await sessionService.startNextRound().catch(e => {
                expect(e).toEqual(new Error('No persons for you'));
            });
        });

        it('throws when not receiving 6 persons', async () => {
            const pMock = TypeMoq.Mock.ofType<PersistentPersonService>(PersistentPersonService);
            pMock.setup(s => s.getSixRandom()).returns(() => Promise.resolve(null));
            const sessionService = new SessionService(pMock.object);
            const result = await sessionService.startNextRound().catch(e => {
                expect(e).toEqual(new Error('Failed to retrieve persons to display.'));
            });
        });
    });

    describe('check person', () => {
        it('returns whether the given index corresponds to the correct person', () => {
            const person = startedService.correctPerson;
            const corrIndex = persons.findIndex(p => p.name === person.name);
            const wrongIndex = persons.findIndex(p => p.name !== person.name);
            expect(startedService.checkPerson(corrIndex)).toBeTruthy();
            expect(startedService.checkPerson(wrongIndex)).toBeFalsy();
        });
    });

    describe('finish round', () => {
        it('increases the score of the correct person', () => {
            const person = startedService.correctPerson;
            const score = person.score;
            startedService.finishRound();
            expect(person.score).toBe(score + 1);
        });
    });

    describe('is session finished', () => {
        it('returns false if less than 6 rounds have been played', async () => {
            let i: number;
            for (i = 1; i < 6; i++) {
                await startedService.startNextRound();
                expect(startedService.isSessionFinished()).toBeFalsy();
            }
        });

        it('returns true if 6 rounds have been played and false in the 7th', async () => {
            let i: number;
            for (i = 1; i < 7; i++) {
                await startedService.startNextRound();
            }
            expect(startedService.isSessionFinished()).toBeTruthy();
            await startedService.startNextRound();
            expect(startedService.isSessionFinished()).toBeFalsy();
        });
    });
});
