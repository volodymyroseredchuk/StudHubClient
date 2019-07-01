import { UserService } from './user.service';
import { UniversityService } from './university.service';

describe('BaseService', () => {
  it('should create an instance', () => {
    expect(new UniversityService()).toBeTruthy();
  });
});
