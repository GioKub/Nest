import { Injectable } from '@nestjs/common';
import { User} from './schemas/user.schema';
import { HashPassword } from 'src/utils/hash';
import { UserRepostiory } from 'src/DB/user.repostiory';

@Injectable()
export class UserService {
  constructor(
    private hashPassword: HashPassword,
    private userRepostory: UserRepostiory
  ) {}

  async getAllService(): Promise<User[]> {
    return await this.userRepostory.getAllRepository()
  }

  async getOneService(username): Promise<User> {
    return await this.userRepostory.getOneRepostiory({ username });
  }

  async createOneService(user): Promise<any> {
    const hashResult = await this.hashPassword.hash(user.password);
    user.password = hashResult.password;
    user.salt = hashResult.salt;
    return await this.userRepostory.createOneRepository(user);
  }

  //NOT FINISHED!!!!!!!!!!!!
  async updateOneService(username, newUser): Promise<User> {
    await this.userRepostory.updateOneRepository({ username }, { $set: newUser });
    return this.userRepostory.getOneRepostiory({ username });
  }

  async deleteOneService(username): Promise<any> {
    return await this.userRepostory.deleteOneRepository(username);
  }
}
