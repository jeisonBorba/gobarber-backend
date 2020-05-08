import User from '../infra/typeorm/entities/User';

import ICreateUSerDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUSerDTO): Promise<User>;
  save(user: User): Promise<User>;
}
