import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRespository: FakeUsersRespository;
let fakeStorageProvider: FakeStorageProvider;
let updateUSerAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUSerAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the user avatar', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUSerAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUSerAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await updateUSerAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUSerAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
