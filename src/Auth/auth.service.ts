import { Injectable } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashPassword } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashPassword: HashPassword,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getOneService(username);
    const hashResult = await this.hashPassword.hash(password, user.salt);
    if (user && user.password === hashResult.password) {
      //const { password, ...result } = user;
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
