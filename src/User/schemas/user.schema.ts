import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './user.role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  //change default to user
  @Prop({ default: 'Admin', required: true, enum: Role })
  role: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
