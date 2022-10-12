import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);

      return {
        message: 'user registered',
        success: true,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async login(loginDto: LoginDto) {
    // authenticate user and password
    const user = await this.usersService.authenticateUser(loginDto);

    // generate and sign token
    const token = await this._createToken(user);
    await this.updateRefreshToken(user.id, token.refreshToken);
    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async _createToken({ id, email }): Promise<any> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, email },
        {
          secret: 'auth_token_secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          email,
        },
        {
          secret: 'refresh_token_secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const tokens = await this._createToken(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
