import User from '../models/userModel';
import generateToken from '../helper/generateAuthToken';
import { encryptPassword } from '../helper/hashedPassword';


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


  res.status(201).json({ status: 201, message: 'User created successfull', data: { token } });
};

export { signup, users };
