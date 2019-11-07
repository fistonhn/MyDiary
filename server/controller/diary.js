import { pool } from '../config/configulation';
import query from '../db/queries';

const createNewEntry = async (req, res) => {
  const { title, description } = req.body;
  const { email } = req.authUser;

  const createdOn = new Date().toLocaleString();

  const entries = await pool.query(query.saveDiary(email, title, description, createdOn));


  return res.status(201).json({ status: 201, message: 'entry successfully created', data: entries.rows[0] });
};

const getAllEntries = async (req, res) => {
  const { email } = req.authUser;
  const userEntries = await pool.query(query.getAllPaging(email));

  if (userEntries.rowCount < 0) return res.status(404).send({ status: 404, message: 'you have no entries!' });

  let onPage = req.query.p * 1;
  let entryNumber = userEntries.rows.length;
  const EntryPerPage = 3;
  const totalEntries = entryNumber;
  const allPages = Math.ceil(totalEntries / EntryPerPage);
  const firstEntry = (EntryPerPage * onPage) - EntryPerPage;
  const lastEntry = (EntryPerPage * onPage);
  let data = userEntries.rows.slice(firstEntry, lastEntry);
  const thisPage = data.length;

  if (onPage <= 0) return res.status(404).send({ status: 404, message: 'the page you request does not exist!' });

  if (!onPage) return res.status(200).send({ status: 200, message: 'display all entries', data: userEntries.rows });

  if (thisPage === 0) return res.status(404).send({ status: 404, message: 'the page you request does not exist' });

  return res.status(200).send({
    status: 200,
    message: 'display all entries',
    totalEntries,
    allPages,
    thisPage,
    onPage,
    data,
  });
};

const getOneEntry = async (req, res) => {
  const { email } = req.authUser;
  const { id } = req.params;
  const entry = await pool.query(query.getSpecific(email, id));

  if (entry.rowCount > 0) {
    res.status(200).json({ status: 200, data: entry.rows[0] });
  } else {
    res.status(404).json({ status: 404, message: 'No entry to display' });
  }
};

const updateEntry = async (req, res) => {
  const { email } = req.authUser;
  const { id } = req.params;
  const entry = await pool.query(query.getSpecific(email, id));

  if (entry.rowCount === 0) return res.status(404).json({ status: 404, message: 'entry not found' });

  let { title } = req.body;
  let { description } = req.body;

  if (!title && !description) return res.status(400).json({ status: 400, message: 'please update either title or description!' });

  if (!title) {
    title = entry.rows[0].title;
  }
  if (!description) {
    description = entry.rows[0].description;
  }


  const updateData = await pool.query(query.updateSpecific(title, description, email, id));

  res.status(200).json({ message: 'entry successful updated', data: updateData.rows[0] });
};

const deleteEntry = async (req, res) => {
  const { email } = req.authUser;
  const { id } = req.params;
  const entry = await pool.query(query.deleteDiary(email, id));


  if (entry.rowCount > 0) {
    res.status(200).json({ status: 200, message: '​entry successfully deleted' });
  } else {
    res.status(404).json({ status: 404, message: 'entry not found' });
  }
};

export { createNewEntry, getAllEntries, getOneEntry, updateEntry, deleteEntry };
