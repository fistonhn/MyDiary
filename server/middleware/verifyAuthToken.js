import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === 'undefined') return res.status(401).json({ err: 'Unauthorised - Header Not Set' });

  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorised Token', err });
      return;
    }
    req.authUser = decodedToken;
    next();
  });
};


export default verifyToken;
