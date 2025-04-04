import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      // 1. Проверяем, что refreshToken — валидный JWT
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_KEY, // Используй тот же секрет, что для refresh_token
      });
      console.log('Refresh token payload:', payload);

      // 2. Ищем пользователя с совпадающим refreshToken
      const users = await this.usersService.findAll();
      for (const user of users) {
        if (user.refreshToken && (await bcrypt.compare(refreshToken, user.refreshToken))) {
          request.user = user; // Передаем пользователя в запрос
          return true;
        }
      }

      throw new UnauthorizedException('Invalid refresh token');
    } catch (error) {
      console.log('Refresh token verification failed:', error.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
