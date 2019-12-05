import { Person } from './person';

/**
 * A person that can be stored in the database.
 */
export class StorablePerson {
    id: number;
    name: string;
    picture: string;

    /**
     * Converts a Person object to a StorablePerson.
     */
    public static fromPerson(person: Person): StorablePerson {
        const storablePerson = new StorablePerson();
        if (person.id != null) {
            storablePerson.id = person.id;
        }
        storablePerson.name = person.name;
        storablePerson.picture = person.picture;
        return storablePerson;
    }

    /**
     * Converts a StorablePerson to a Person.
     */
    public toPerson(): Person {
        return new Person(this.name, this.picture, this.id);
    }
}
