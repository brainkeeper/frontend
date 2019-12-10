import { Person } from '../classes/person';

/**
 * A service that manages persons available for the game.
 */
export abstract class PersonService {
    /**
     * Gets all persons.
     */
    abstract getAll(): Promise<Person[]>;

    /**
     * Gets a person.
     * @param id Id of the person.
     * @returns The person or undefined if no person was found.
     */
    abstract getById(id: number): Promise<Person | undefined>;

    /**
     * Gets six random persons for one game session.
     */
    abstract getSixRandom(): Promise<Person[]>;


    /**
     * Gets all persons that have a score greater than zero
     * in descending order, sorted by score.
     */
    abstract getAllWithScore(): Promise<Person[]>;

    /**
     * Adds a new person.
     * Id of the person to add must be null.
     * @returns The newly added person with a set id.
     */
    abstract add(person: Person): Promise<Person>;

    /**
     * Removes a person.
     * @param id Id of the person to remove.
     */
    abstract remove(id: number): Promise<void>;

    /**
     * Updates a person.
     */
    abstract update(person: Person): Promise<boolean>;
}
