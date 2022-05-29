import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(128).required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required(),
  confirmPassword: Joi.any().equal(Joi.ref("password")).required(),
});
