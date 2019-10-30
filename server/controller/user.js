import User from '../models/userModel';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';


const users = [];

const signup = (req, res) => {
  const takenEmail = users.find((user) => user.email === req.body.email);
  if (takenEmail) return res.status(409).json({ status: 409, message: 'Email address already taken' });

  const id = users.length + 1;
  let { firstName, lastName, email, password } = req.body;

  password = encryptPassword(password);
  const user = new User(id, firstName, lastName, email, password);

  const token = generateToken(id, user.email);

  users.push(user);


  res.status(201).json({ status: 201, message: 'User created successfull', data: { token, firstName, lastName } });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const usersFound = users.find(((userInfo) => userInfo.email === email));
  if (!usersFound) return res.status(404).send({ status: 404, message: 'No associated account with this email. 😩' });

  const isPasswordValid = decryptPassword(password, usersFound.password);
  if (!isPasswordValid) return res.status(401).json({ status: 401, error: 'Incorrect password!' });

  const token = generateToken(usersFound.id, usersFound.email);

  res.status(200).json({ status: 200, message: 'loggin successfull', data: { token } });
};

export { signup, login, users };
