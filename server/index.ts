import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { config } from 'dotenv';
import { connect } from './config/database';
import { authRouter } from './routes/api/auth';

(async () => {
  config();

  const app: express.Application = express();
  const PORT: string | number = process.env.PORT || 5000;

  app.use(cors());
  app.use(morgan('dev'));
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/auth', authRouter);

  await connect();

  app.listen(PORT, () => {
    console.log(`🚀️ Listening on ${PORT}`);
  });
})();
