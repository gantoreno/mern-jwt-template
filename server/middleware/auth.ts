import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '../models/user.model';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session) {
    if (req.session.token) {
      const { token } = req.session;

      const isValid: boolean = !!jwt.verify(token, process.env.JWT_SECRET!);

      if (isValid) {
        return next();
      }

      return res
        .status(401)
        .send({ success: false, response: 'Invalid token' });
    }

    return res
      .status(401)
      .send({ success: false, response: 'Token not provided' });
  }

  return res.status(401).send({ success: false, response: 'Cookie error' });
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  return verifyToken(req, res, async () => {
    const { token } = req.session!;
    const { email, password } = <any>jwt.verify(token, process.env.JWT_SECRET!);

    const user: IUser | null = await User.findOne({ email, password });

    if (user) {
      return next();
    }

    return res
      .status(401)
      .send({ success: false, response: 'User does not exist' });
  });
};
