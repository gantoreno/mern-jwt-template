import * as EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

export const validateEmail = (email: string): boolean => {
  return EmailValidator.validate(email);
};

export const validatePassword = (password: string): boolean => {
  const schema: PasswordValidator = new PasswordValidator();

  schema
    .is()
    .min(6)
    .is()
    .max(20)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

  return schema.validate(password) as boolean;
};

export const validatePasswordMatch = (
  password: string,
  passwordRepeat: string
): boolean => {
  return password === passwordRepeat;
};
