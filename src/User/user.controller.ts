import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Request,
  SetMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/Auth/local-auth.guard';
import { AuthService } from '../Auth/auth.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

//if public decorator is set jwt strategy is not executed
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}
  // getAllUsers
  @Public()
  @Get()
  async getAllController() {
    return await this.userService.getAllService();
  }

  // getOneUser
  @Get(':username')
  async getOneController(@Param('username') username, @Request() req) {
    if (req.user.username !== username) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return await this.userService.getOneService(username);
  }

  // createOneUser
  @Public()
  @Post()
  async createUser(@Body() newUser) {
    return await this.userService.createOneService(newUser);
  }

  //NOT FINISHED!!!!!!!!!!!!
  // updateOneUser
  @Put(':username')
  async updateOneController(
    @Param('username') username,
    @Body() newUser,
    @Request() req,
  ) {
    if (req.user.role !== 'Admin' && req.user.username !== username) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return await this.userService.updateOneService(username, newUser);
  }

  // deleteOneUser
  @Delete(':username')
  async deleteOneController(@Param(':username') username, @Request() req) {
    if (req.user.role !== 'Admin' && req.user.username !== username) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.userService.deleteOneService(username);
  }

  // getJwtToken
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  // change this from Post to Get only reason post is used beacuse...
  // ...GET handler catches 'profile' as ':nickname'
  // getUserFromJwtToken
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
