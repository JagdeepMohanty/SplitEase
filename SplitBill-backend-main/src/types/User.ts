import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  generateAuthToken(): string;
}

export type UserDocument = IUser & Document;
export type UserType = IUser & { _id: string };
