import { Person } from './person';
import { StorablePerson } from './storable-person';

describe('StorablePerson', () => {
    describe('fromPerson', () => {
        it('converts Person to StorablePerson when id is null', () => {
            const person = new Person('Jon Doe', 'abc');
            expect(person.id).toBeNull();
            const storablePerson = StorablePerson.fromPerson(person);
            expect(storablePerson.id).toBeUndefined();
            expect(storablePerson.name).toBe('Jon Doe');
            expect(storablePerson.picture).toBe('abc');
            expect(storablePerson.score).toBe(0);
        });

        it('converts Person to StorablePerson when id is 0', () => {
            const person = new Person('Jon Doe', 'abc', 0, 1);
            const storablePerson = StorablePerson.fromPerson(person);
            expect(storablePerson.id).toBe(0);
            expect(storablePerson.name).toBe('Jon Doe');
            expect(storablePerson.picture).toBe('abc');
            expect(storablePerson.score).toBe(1);
        });
    });

    describe('toPerson', () => {
        it('converts StorablePerson to Person when id is undefined', () => {
            const storablePerson = new StorablePerson();
            storablePerson.name = 'Jon Doe';
            storablePerson.picture = 'abc';
            storablePerson.score = 32;
            const person = storablePerson.toPerson();
            expect(person.id).toBeNull();
            expect(person.name).toBe('Jon Doe');
            expect(person.picture).toBe('abc');
            expect(person.score).toBe(32);
        });

        it('converts StorablePerson to Person when id 0', () => {
            const storablePerson = new StorablePerson();
            storablePerson.name = 'Jon Doe';
            storablePerson.picture = 'abc';
            storablePerson.id = 0;
            storablePerson.score = 16;
            const person = storablePerson.toPerson();
            expect(person.id).toBe(0);
            expect(person.name).toBe('Jon Doe');
            expect(person.picture).toBe('abc');
            expect(person.score).toBe(16);
        });
    });
});
