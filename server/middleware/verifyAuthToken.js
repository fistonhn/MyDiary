import { users } from '../controller/user';
import { verifyAuthToken } from '../helper/generateAuthToken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === 'undefined') return res.status(401).json({ err: 'Unauthorised - Header Not Set' });

  try {
    const decoded = verifyAuthToken(authHeader);

    const authUserId = users.find((user) => user.id === decoded);
    if (!authUserId) return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });

    next();
  } catch (error) {
    res.status(400).json({ status: res.statusCode, error: 'Invalid token' });
  }
};


export default verifyToken;
