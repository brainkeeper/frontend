import { Person } from './person';

describe('Person', () => {
  describe('ctor', () => {
    it('throws when name is null', () => {
        expect(() => new Person(null, 'abc')).toThrowError();
    });

    it('throws when name is empty', () => {
      expect(() => new Person('', 'abc')).toThrowError();
    });

    it('throws when picture is null', () => {
      expect(() => new Person('Jon Doe', null)).toThrowError();
    });

    it('throws when picture is empty', () => {
      expect(() => new Person('Jon Doe', '')).toThrowError();
    });

    it('throws when id is -1', () => {
      expect(() => new Person('Jon Doe', 'abc', -1)).toThrowError();
    });

    it('throws when id is -10', () => {
      expect(() => new Person('Jon Doe', 'abc', -10)).toThrowError();
    });

    it('throws when id is 1.2', () => {
      expect(() => new Person('Jon Doe', 'abc', 1.2)).toThrowError();
    });

    it('throws when id is infinity', () => {
      expect(() => new Person('Jon Doe', 'abc', Number.POSITIVE_INFINITY)).toThrowError();
    });

    it('throws when id is null', () => {
      expect(() => new Person('Jon Doe', 'abc', null)).toThrowError();
    });

    it('throws when score is -1', () => {
      expect(() => new Person('Jon Doe', 'abc', 0, -1)).toThrowError();
    });

    it('creates with no id set', () => {
      const person = new Person('Jon Doe', 'abc');
      expect(person.name).toBe('Jon Doe');
      expect(person.picture).toBe('abc');
      expect(person.id).toBeNull();
      expect(person.score).toBe(0);
    });

    it('creates with id 0', () => {
      const person = new Person('Jon Doe', 'abc', 0);
      expect(person.name).toBe('Jon Doe');
      expect(person.picture).toBe('abc');
      expect(person.id).toBe(0);
      expect(person.score).toBe(0);
    });

    it('creates with id 1', () => {
      const person = new Person('Jon Doe', 'abc', 1);
      expect(person.name).toBe('Jon Doe');
      expect(person.picture).toBe('abc');
      expect(person.id).toBe(1);
      expect(person.score).toBe(0);
    });

    it('creates with id 20', () => {
      const person = new Person('Jon Doe', 'abc', 20);
      expect(person.name).toBe('Jon Doe');
      expect(person.picture).toBe('abc');
      expect(person.id).toBe(20);
      expect(person.score).toBe(0);
    });

    it('creates with score 23', () => {
      const person = new Person('Jon Doe', 'abc', 20, 23);
      expect(person.score).toBe(23);
    });
  });

  describe('setter', () => {
      it('throws when setting id to null', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.id = null).toThrowError();
      });

      it('throws when setting id to -1', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.id = -1).toThrowError();
      });

      it('throws when setting id to 1.2', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.id = 1.2).toThrowError();
      });

      it('throws when setting id to infinity', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.id = Number.POSITIVE_INFINITY).toThrowError();
      });

      it('throws when setting id to undefined', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.id = undefined).toThrowError();
      });

      it('throws when setting name to null', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.name = null).toThrowError();
      });

      it('throws when setting name to empty', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.name = '').toThrowError();
      });

      it('throws when setting name to undefined', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.name = undefined).toThrowError();
      });

      it('throws when setting picture to null', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.picture = null).toThrowError();
      });

      it('throws when setting picture to empty', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.picture = '').toThrowError();
      });

      it('throws when setting picture to undefined', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.picture = undefined).toThrowError();
      });

      it('throws when setting score to null', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.score = null).toThrowError();
      });

      it('throws when setting score to -1', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        expect(() => person.score = -1).toThrowError();
      });

      it('sets name', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        person.name = 'Jane Doe';
        expect(person.name).toBe('Jane Doe');
      });

      it('sets picture', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        person.picture = 'cde';
        expect(person.picture).toBe('cde');
      });

      it('sets id', () => {
        const person = new Person('Jon Doe', 'abc', 1);
        person.id = 2;
        expect(person.id).toBe(2);
      });

      it('sets score', () => {
        const person = new Person('Jon Doe', 'abc', 1, 1);
        person.score = 2;
        expect(person.score).toBe(2);
      });
  });

  describe('copy', () => {
    it('copies person with no id', () => {
      const person = new Person('Jon Doe', 'abc', undefined, 2);
      const copy = person.copy();

      expect(person.name).toEqual(copy.name);
      expect(person.id).toEqual(person.id);
      expect(person.picture).toEqual(person.picture);
      expect(person.score).toEqual(person.score);
    });

    it('copies person with an id', () => {
      const person = new Person('Jon Doe', 'abc', 5, 2);
      const copy = person.copy();

      expect(person.name).toEqual(copy.name);
      expect(person.id).toEqual(person.id);
      expect(person.picture).toEqual(person.picture);
      expect(person.score).toEqual(person.score);
    });
  });
});
