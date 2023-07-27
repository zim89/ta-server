import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат email").isEmail(),
  body("password", "Пароль должен быть минимум 3 символа").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат email").isEmail(),
  body("password", "Пароль должен быть минимум 3 символа").isLength({ min: 3 }),
];

export const tattooCreateValidation = [
  body("desc", "Минимум 3 символа").isLength(5).isString(),
  body("part", "Минимум 2 символа").isLength({ min: 2 }).isString(),
  body("imgUrl", "Неверная ссылка на картинку").isString(),
];
