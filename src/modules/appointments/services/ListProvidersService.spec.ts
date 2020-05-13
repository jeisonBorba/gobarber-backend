import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRespository: FakeUsersRespository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();

    listProvidersService = new ListProvidersService(fakeUsersRespository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const user2 = await fakeUsersRespository.create({
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRespository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
