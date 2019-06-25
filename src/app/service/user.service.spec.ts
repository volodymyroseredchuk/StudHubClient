import { UserService } from './user.service';

describe('BaseService', () => {
  it('should create an instance', () => {
    expect(new UserService()).toBeTruthy();
  });
});
