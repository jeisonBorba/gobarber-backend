import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to update the user avatar', async () => {
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUSerAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

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
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUSerAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

    expect(
      updateUSerAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUSerAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

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
