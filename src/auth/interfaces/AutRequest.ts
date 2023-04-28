import { Request } from 'express';

export interface IUser {
  name: string;
  email: string;
  id: number;
}

export interface IAutRequest extends Request {
  user: IUser;
}
