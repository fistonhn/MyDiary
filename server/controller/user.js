import lodash from 'lodash';
import { generateToken } from '../helper/generateAuthToken';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';
import { pool } from '../db/connection';
import query from '../db/queries';


const signup = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const usersFound = await pool.query(query.findUser(email));

    if (usersFound.rowCount > 0) return res.status(409).json({ message: 'Email address already taken' });

    password = encryptPassword(password);
    const user = await pool.query(query.regUser(firstName, lastName, email, password));

    const token = generateToken(user.rows[0].id);

    const data = {
      token,
      userInfo: lodash.pick(user.rows[0], 'firstname', 'lastname', 'email'),
    };

    res.status(201).json({ status: 201, message: 'User created successfull', data });
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usersFound = await pool.query(query.findUser(email));

    if (usersFound.rows.length < 1) return res.status(404).send({ message: 'No associated account with this email' });

    const isPasswordValid = decryptPassword(password, usersFound.rows[0].password);
    if (!isPasswordValid) return res.status(401).json({ status: 401, error: 'Incorrect password!' });

    const token = generateToken(usersFound.rows[0].id);

    const data = {
      token,
      userInfo: lodash.pick(usersFound.rows[0], 'firstname', 'lastname', 'email'),
    };
    res.status(200).json({ status: 200, message: 'loggin successfull', data });
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
};

export { signup, login };
