import Entry from '../models/entryModules';
import { verifyAuthToken } from '../helper/generateAuthToken';

const entries = [];

const createNewEntry = (req, res) => {
  let { title, description } = req.body;
  const authUserId = verifyAuthToken(req.headers.authorization);
  const date = new Date().toLocaleString();
  const entry = new Entry(entries.length + 1, date, title, description, authUserId);
  entries.push(entry);
  return res.status(201).send({
    status: 201,
    message: 'entry successfully created',
    data: entry,
  });
};

const getAllEntries = (req, res) => {
  const authUserId = verifyAuthToken(req.headers.authorization);
  const userEntries = entries.filter((entry) => entry.userId === authUserId);

  if (userEntries.length === 0) return res.status(404).send({ status: 404, message: 'you have zero entries!' });

  userEntries.reverse();
  let onPage = req.query.p * 1;
  let entryNumber = userEntries.length;
  const EntryPerPage = 3;
  const totalEntries = entryNumber;
  const allPages = Math.ceil(entryNumber / EntryPerPage);
  const firstEntry = (EntryPerPage * onPage) - EntryPerPage;
  const lastEntry = (EntryPerPage * onPage);
  let data = userEntries.slice(firstEntry, lastEntry);
  const thisPage = data.length;

  if (thisPage === 0) return res.status(404).send({ status: 404, message: 'this page have no entry' });

  return res.status(200).send({
    status: 200,
    message: 'display entry paging',
    totalEntries,
    allPages,
    thisPage,
    onPage,
    data,
  });
};

const getOneEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  const authUserId = verifyAuthToken(req.headers.authorization);

  if (entry.userId !== authUserId) return res.status(403).send({ status: 403, message: 'this entry does not belongs to you!' });

  return res.status(200).json({ status: 200, data: entry });
};

const updateEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  const authUserId = verifyAuthToken(req.headers.authorization);

  if (entry.userId !== authUserId) return res.status(403).send({ status: 403, message: 'this entry does not belongs to you!' });

  entry.title = req.body.title;
  entry.description = req.body.description;

  return res.status(200).json({ status: 200, message: 'entry successfully updated', data: entry });
};

const deleteEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  const authUserId = verifyAuthToken(req.headers.authorization);

  if (entry.userId !== authUserId) return res.status(403).send({ status: 403, message: 'this entry does not belongs to you!' });

  const index = entries.indexOf(entry);

  entries.splice(index, 1);

  return res.status(200).json({ status: 200, message: '​entry successfully deleted' });
};


export { getAllEntries, createNewEntry, getOneEntry, updateEntry, deleteEntry };
