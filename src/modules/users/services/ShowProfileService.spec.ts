import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRespository: FakeUsersRespository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();

    showProfileService = new ShowProfileService(fakeUsersRespository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@doe.com');
  });

  it('should not be able to show profile from a non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
