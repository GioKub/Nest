import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
