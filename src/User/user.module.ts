import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from 'src/Auth/auth.module';
import { JwtStrategy } from 'src/Auth/jwt.strategy';
import { HashPassword } from 'src/utils/hash';
import { UserRepostiory } from 'src/DB/user.repostiory';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, HashPassword, UserRepostiory],
  exports: [UserService],
})
export class UserModule {}
