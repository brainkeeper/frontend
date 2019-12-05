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
        });

        it('converts Person to StorablePerson when id is 0', () => {
            const person = new Person('Jon Doe', 'abc', 0);
            const storablePerson = StorablePerson.fromPerson(person);
            expect(storablePerson.id).toBeUndefined();
            expect(storablePerson.name).toBe('Jon Doe');
            expect(storablePerson.picture).toBe('abc');
        });
    });

    describe('toPerson', () => {
        it('converts Person to StorablePerson when id is undefined', () => {
            const storablePerson = new StorablePerson();
            storablePerson.name = 'Jon Doe';
            storablePerson.picture = 'abc';
            const person = storablePerson.toPerson();
            expect(person.id).toBeNull();
            expect(person.name).toBe('Jon Doe');
            expect(person.picture).toBe('abc');
        });

        it('converts Person to StorablePerson when id 0', () => {
            const storablePerson = new StorablePerson();
            storablePerson.name = 'Jon Doe';
            storablePerson.picture = 'abc';
            storablePerson.id = 0;
            const person = storablePerson.toPerson();
            expect(person.id).toBe(0);
            expect(person.name).toBe('Jon Doe');
            expect(person.picture).toBe('abc');
        });
    });
});
