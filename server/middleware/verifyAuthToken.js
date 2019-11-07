import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../config/configulation';
import query from '../db/queries';

dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = await req.headers.authorization;

  if (typeof authHeader === 'undefined') return res.status(401).json({ err: 'Unauthorised - Header Not Set' });

  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorised Token or token not provided', err });
    }
    req.authUser = decodedToken;
    const authEmail = decodedToken.email;

    const usersFound = await pool.query(query.findUser(authEmail));

    if (!usersFound.rows[0]) return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });

    next();
  });
};


export default verifyToken;
