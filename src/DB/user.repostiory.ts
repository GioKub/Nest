import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../User/schemas/user.schema'
import { HashPassword } from 'src/utils/hash';

@Injectable()
export class UserRepostiory {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

  async getAllRepository(): Promise<User[]> {
    const users = this.userModel.find();
    return users;
  }

  async getOneRepostiory(username): Promise<User> {
    const user = this.userModel.findOne({ username });
    return user;
  }

  async createOneRepository(user): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  //NOT FINISHED!!!!!!!!!!!!
  async updateOneRepository(username, newUser): Promise<User> {
    await this.userModel.findOneAndUpdate({ username }, { $set: newUser });
    return this.userModel.findOne({ username });
  }

  async deleteOneRepository(username): Promise<any> {
    return this.userModel.deleteOne(username);
  }
}
