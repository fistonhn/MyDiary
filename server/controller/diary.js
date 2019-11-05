import { pool } from '../config/configulation';
import query from '../db/queries';
// import verifyToken from '../middleware/verifyAuthToken';


const createNewEntry = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { Email: email } = req.authUser;

    const createdOn = new Date().toLocaleString();

    const entries = await pool.query(query.saveDiary(email, title, description, createdOn));


    return res.status(201).json({ status: 201, message: 'entry successfully created', data: entries.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
};


export { createNewEntry };
