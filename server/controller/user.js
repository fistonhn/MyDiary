import lodash from 'lodash';
import User from '../models/userModel';
import { generateToken } from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';


const users = [];

const signup = (req, res) => {
  const takenEmail = users.find((user) => user.email === req.body.email);
  if (takenEmail) return res.status(409).json({ status: 409, message: 'Email address already taken' });

  const id = users.length + 1;
  let { firstName, lastName, email, password } = req.body;

  password = encryptPassword(password);
  const user = new User(id, firstName, lastName, email, password);

  const token = generateToken(id);

  users.push(user);

  const data = {
    token,
    userInfo: lodash.pick(user, ['firstName', 'lastName', 'email']),
  };

  res.status(201).json({ status: 201, message: 'User created successfull', data });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const usersFound = users.find(((userInfo) => userInfo.email === email));
  if (!usersFound) return res.status(404).send({ status: 404, error: 'No associated account with this email. 😩' });

  const isPasswordValid = decryptPassword(password, usersFound.password);
  if (!isPasswordValid) return res.status(401).json({ status: 401, error: 'Incorrect password!' });

  const token = generateToken(usersFound.id);

  const data = {
    token,
    userInfo: lodash.pick(usersFound, ['firstName', 'lastName', 'email']),
  };

  res.status(200).json({ status: 200, message: 'loggin successfull', data });
};

export { signup, login, users };
