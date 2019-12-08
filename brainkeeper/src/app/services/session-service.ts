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
        this._round = 1;
        this._personService = personService;
    }

    public get round() {
        return this._round;
    }

    public get correctPerson() {
        return this._correctPerson;
    }

    public get persons() {
        return this._selectedPersons;
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
        const choseRight = selectedPerson === this.correctPerson;
        if (choseRight) {

        } else {
            // TODO 
        }
        return choseRight;
    }

}
