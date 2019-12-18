import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { PersonService } from './person-service';

/**
 * A service that manages the persons appearing in each round.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

    private _round: number;
    private _correctPerson: Person;
    private _selectedPersons: Person[];

    constructor(private personService: PersonService) {
        this._round = 0;
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
        if (this._selectedPersons === undefined) {
            throw new Error('Round must be started before persons are selected!');
        }
        return this._selectedPersons;
    }

    public get pictures() {
        return this.persons.map(p => p.picture);
    }

    public get names() {
        return this.persons.map(p => p.name);
    }

    public set selected(newSelected: Person[]) {
        this._selectedPersons = newSelected;
    }

    public async startNextRound(): Promise<void> {
        this._round++;
        await this.selectSix();
        this.chooseCorrectPerson();
    }

    private async selectSix(): Promise<void> {
        const s = await this.personService.getSixRandom().catch(e => { throw e; });
        if (!s) {
            throw new Error('Failed to retrieve persons to display.');
        }
        this.selected = s;
    }

    private chooseCorrectPerson(): void {
        const index = Math.floor(Math.random() * 6);
        this._correctPerson = this.persons[index];
    }

    public checkPerson(index: number): boolean {
        const selectedPerson =  this.persons[index];
        return selectedPerson === this.correctPerson;
    }

    public finishRound(): void {
        this.correctPerson.score += 1;
    }
}
