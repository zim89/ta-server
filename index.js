import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

import {
  registerValidation,
  loginValidation,
  tattooCreateValidation,
} from './validations.js';
import { UserController, TattooController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

const app = express();
dotenv.config();
app.use(cors());

// Constants
// const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.o9sapro.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(() => console.log('DB ok'))
  .catch(error => console.log('DB error', error));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('picture'), (req, res) => {
  res.json({
    message: 'Файл загружен',
  });
});

app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register,
);
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
app.get('/auth/profile', checkAuth, UserController.getUser);

app.get('/tattoos', TattooController.getAll);

app.post(
  '/tattoos',
  checkAuth,
  tattooCreateValidation,
  handleValidationErrors,
  TattooController.create,
);
app.get('/tattoos/:id', TattooController.getOne);
app.delete('/tattoos/:id', checkAuth, TattooController.remove);
app.patch(
  '/tattoos/:id',
  checkAuth,
  tattooCreateValidation,
  handleValidationErrors,
  TattooController.update,
);

app.listen(process.env.PORT || 4444, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
