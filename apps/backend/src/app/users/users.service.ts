import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';  // Импортируем UserDocument
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ email: createUserDto.email, password: hashedPassword });
    return user.save();  // Возвращаем тип UserDocument
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async updateUser(userId: string, updateData: Partial<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate({ _id: userId }, updateData, { new: true }).exec();
  }

  async findUserByRefreshToken(refreshToken: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ refreshToken }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
