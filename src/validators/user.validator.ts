import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  private static username = Joi.string().min(3).max(50).trim();
  private static email = Joi.string().email().lowercase().trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD).trim();
  private static gender = Joi.valid(...Object.values(EGenders));

  public static createUser = Joi.object({
    name: this.username.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });

  static updateUser = Joi.object({
    name: this.username,
    gender: this.gender,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changeUserPassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
