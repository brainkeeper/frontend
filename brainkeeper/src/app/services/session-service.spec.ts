import { Person } from '../classes/person';
import { SessionService } from './session-service';

describe('SessionService', () => {
    describe('ctor', () => {
        it('creates with round 1' , () => {
            const sessionService = new SessionService();
            expect(sessionService.round).toBe(1);
        });
    });
});
