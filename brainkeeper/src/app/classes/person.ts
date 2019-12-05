/**
 * A person that the player must guess correctly during the game.
 */
export class Person {
    private _id: number | null;
    private _name: string;
    private _picture: string;

    constructor(name: string, picture: string, id?: number) {
        if (!name) {
            throw new Error('Name must not be null/empty/undefined');
        }
        if (!picture) {
            throw new Error('Picture must not be null/empty/undefined');
        }
        if (id !== undefined) {
            this.checkId(id);
        }
        this._id = id === undefined || id == null ? null : id;
        this._picture = picture;
        this._name = name;
    }


    /**
     * Sets the person's id (must be a positive finite integer).
     */
    public set id(id: number) {
        this.checkId(id);
        this._id = id;
    }

    /**
     * The person's id or null when no id is assigned.
     */
    public get id(): number | null {
        return this._id == null ? null : this._id;
    }


    /**
     * Sets the person's name (not null or empty).
     */
    public set name(name: string) {
        if (!name) {
            throw new Error('Name must not be null/empty/undefined');
        }
        this._name = name;
    }

    /**
     * The person's name.
     */
    public get name(): string {
        return this._name;
    }


    /**
     * Sets the person's picture (not null or empty).
     */
    public set picture(picture: string) {
        if (!picture) {
            throw new Error('Picture must not be null/empty/undefined');
        }
        this._picture = picture;
    }

    /**
     * The person's picture.
     */
    public get picture(): string {
        return this._picture;
    }


    private checkId(id: number) {
        if (id === null || id === undefined) {
            throw new Error('Id must not be null or undefined');
        }
        if (id < 0) {
            throw new Error('Id must be positive');
        }
        if (!Number.isInteger(id) || !Number.isFinite(id)) {
            throw new Error('Id must be a finite integer.');
        }
    }
}
