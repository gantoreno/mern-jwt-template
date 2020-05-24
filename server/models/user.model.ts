import { model, Model, Schema, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  encryptPassword(password: string): string;
  comparePassword(password: string): boolean;
  toPlainObject(): object;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.encryptPassword = function (password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toPlainObject = function (): object {
  const plainUser: any = this.toJSON();

  delete plainUser['password'];
  delete plainUser['__v'];

  return plainUser;
};

export const User: Model<IUser> = model<IUser>('users', UserSchema);
