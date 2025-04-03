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

  async login(user: any) {
    const accessPayload = { email: user.email, sub: user._id };
    const refreshPayload = { sub: user._id };

    const accessToken = this.jwtService.sign(accessPayload, { expiresIn: '10s' }); // 10 секунд
    const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

    await this.updateRefreshToken(user._id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const users = await this.usersService.findAll(); // Добавь findAll в UsersService
    let validUser = null;

    for (const user of users) {
      if (user.refreshToken && (await bcrypt.compare(refreshToken, user.refreshToken))) {
        validUser = user;
        break;
      }
    }

    if (!validUser) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.login(validUser);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUser(userId, { refreshToken: hashedToken });
  }
}
