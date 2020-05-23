import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User, IUser } from '../../models/user.model';
import { verifyToken, isLoggedIn } from '../../middleware/auth';

const router: Router = Router();

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const { token } = req.session!;
  const { email, password } = <any>jwt.verify(token, process.env.JWT_SECRET!);

  const user: IUser | null = await User.findOne({ email, password });

  if (user) {
    return res.status(200).send({
      success: true,
      user: user,
      response: 'User successfully fetched',
    });
  }

  return res
    .status(401)
    .send({ success: false, user: null, response: 'User does not exist' });
});

router.get('/protected', isLoggedIn, (_, res: Response) => {
  return res.status(200).send({ succes: true, response: 'You rock!' });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (user) {
    const isValid = user.comparePassword(password);

    if (isValid) {
      const token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      req.session!.token = token;

      return res.status(200).send({
        success: true,
        user: user,
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

router.post('/logout', isLoggedIn, (req: Request, res: Response) => {
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

    const token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    req.session!.token = token;

    return res
      .status(201)
      .send({ success: true, user: user, response: 'Successfully registered' });
  }

  return res
    .status(401)
    .send({ success: false, user: null, response: 'User already registered' });
});

export const authRouter: Router = router;
