import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({  email: createUserDto.email, password: hashedPassword });
    return user.save();
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async updateUser(userId: string, updateData: Partial<User>) {
    return this.userModel.updateOne({ _id: userId }, updateData).exec();
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userModel.findOne({ refreshToken: { $exists: true } }).exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    return this.userModel.findByIdAndUpdate(userId, { refreshToken: hashedToken }, { new: true });
  }
}
