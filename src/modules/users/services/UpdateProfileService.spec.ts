import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRespository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
    });

    expect(updateUser.name).toBe('John Trê');
    expect(updateUser.email).toBe('john@tre.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const user = await fakeUsersRespository.create({
      name: 'Jeison',
      email: 'jeison@teste.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe Alterado',
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without pass old password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@tre.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@tre.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password from a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'nonn-existing-user-id',
        name: 'John Trê',
        email: 'john@tre.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
