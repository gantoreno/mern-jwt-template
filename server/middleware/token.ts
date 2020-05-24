import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session) {
    console.log(req.session);
    if (req.session.token) {
      const { token } = req.session;

      try {
        const user: object | string = jwt.verify(
          token,
          process.env.JWT_SECRET!
        );

        if (!!user) {
          return next();
        }
      } catch (e) {
        console.log(e.response);
        return res
          .status(401)
          .send({ success: false, response: 'Invalid token' });
      }
    }

    return res
      .status(401)
      .send({ success: false, response: 'Token not provided' });
  }

  return res.status(401).send({ success: false, response: 'Session error' });
};
