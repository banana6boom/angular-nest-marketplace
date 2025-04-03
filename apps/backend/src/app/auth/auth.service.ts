import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUser(userId, { refreshToken: hashedToken });
  }

  async refresh(refreshToken: string) {
    const user = await this.usersService.findUserByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Проверяем refresh_token через bcrypt
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.login(user);
  }

  async login(user: any) {
    // Payload для access_token может быть минимальным
    const accessPayload = { email: user.email, sub: user._id };

    // Payload для refresh_token может содержать только id или другие минимальные данные
    const refreshPayload = { sub: user._id }; // Например, не включаем email

    const accessToken = this.jwtService.sign(accessPayload, { expiresIn: '3m' });
    const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

    await this.updateRefreshToken(user._id, refreshToken); // Сохраняем refresh_token

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
