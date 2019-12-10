import { Person } from '../classes/person';
import { PersonService } from './person-service';

/**
 * A service that manages the persons appearing in each round.
 */
export class SessionService {

    private _personService: PersonService;
    private _round: number;
    private _correctPerson: Person;
    private _selectedPersons: Person[];

    constructor(public personService: PersonService) {
        if (!personService) {
            throw new Error('A PersonService must be provided.');
        }
        this._round = 0;
        this._personService = personService;
    }

    public get round() {
        return this._round;
    }

    public get correctPerson() {
        if (!this._correctPerson) {
            throw new Error('Round must be started before a person is selected!');
        }
        return this._correctPerson;
    }

    public get correctPersonName() {
        return this.correctPerson.name;
    }

    public get persons() {
        if (!this._selectedPersons) {
            throw new Error('Round must be started before persons is selected!');
        }
        return this._selectedPersons;
    }

    public get pictures() {
        return [this.persons.map(p => p.picture)];
    }

    private set selected(newSelected: Person[]) {
        this._selectedPersons = newSelected;
    }

    public startNextRound(): void {
        this._round++;
        this.selectSix();
        this.chooseCorrectPerson();
    }

    private selectSix(): void {
        this._personService.getSixRandom()
        .then(
            (result) => {
                this.selected = result;
            },
            (error) => {
                console.log('Failed to retrieve persons to display.', error);
            });
    }

    private chooseCorrectPerson(): void {
        const index = Math.floor(Math.random() * 6);
        this._correctPerson = this.persons[index];
    }

    public checkPerson(index: number): boolean {
        const selectedPerson =  this.persons[index];
        return selectedPerson === this.correctPerson;
    }

}
