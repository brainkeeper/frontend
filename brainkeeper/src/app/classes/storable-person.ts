import { Person } from './person';

/**
 * A person that can be stored in the database.
 */
export class StorablePerson {
    id: number;
    name: string;
    picture: string;
    score: number;

    constructor(id?: number, name?: string, picture?: string, score?: number) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.score = score;
    }

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
        storablePerson.score = person.score;
        return storablePerson;
    }

    /**
     * Converts a StorablePerson to a Person.
     */
    public toPerson(): Person {
        return new Person(this.name, this.picture, this.id, this.score);
    }
}
