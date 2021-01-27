import express = require('express');
import User from '../models/user.model';
const usersRouter = express.Router();

usersRouter.route('/').get((req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
});

usersRouter.route('/add').post((req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const city = req.body.city;

  const newUser = new User({
    firstName,
    lastName,
    email,
    city
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(next);
});

export default usersRouter; 
