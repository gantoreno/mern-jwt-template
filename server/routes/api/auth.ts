import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User, IUser } from '../../models/user.model';
import { verifyToken } from '../../middleware/token';

const router: Router = Router();

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const { token } = req.session!;
  const user: any = jwt.verify(token, process.env.JWT_SECRET!);

  delete user['iat'];
  delete user['exp'];

  return res.status(200).send({
    success: true,
    user: user,
    response: 'User successfully fetched',
  });
});

router.get('/protected', verifyToken, (_, res: Response) => {
  return res.status(200).send({ succes: true, response: 'You rock!' });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user: IUser | null = await User.findOne({ email });

  if (user) {
    const isValid = user.comparePassword(password);

    if (isValid) {
      const plainUser = user.toJSON();

      delete plainUser['password'];
      delete plainUser['__v'];

      const token: string = jwt.sign(plainUser, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      req.session!.token = token;

      return res.status(200).send({
        success: true,
        user: plainUser,
        response: 'Successfully logged in',
      });
    }

    return res
      .status(401)
      .send({ success: false, user: null, response: 'Incorrect password' });
  }

  return res
    .status(401)
    .send({ success: false, user: null, response: 'User not found' });
});

router.post('/logout', verifyToken, (req: Request, res: Response) => {
  req.session!.token = null;

  return res
    .status(200)
    .send({ success: true, user: null, response: 'Successfully logged out' });
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(await User.findOne({ email }))) {
    const user: IUser | null = new User();

    user.email = email;
    user.password = user.encryptPassword(password);

    await user.save();

    const plainUser = user.toJSON();

    delete plainUser['password'];
    delete plainUser['__v'];

    const token: string = jwt.sign(plainUser, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    req.session!.token = token;

    return res.status(201).send({
      success: true,
      user: plainUser,
      response: 'Successfully registered',
    });
  }

  return res
    .status(401)
    .send({ success: false, user: null, response: 'User already registered' });
});

export const authRouter: Router = router;
