import Entry from '../models/entryModules';

const entries = [];

const getAllEntries = (req, res) => {
  const entryFound = entries.find((entry) => entry);

  if (!entryFound) return res.status(404).json({ status: 404, error: 'There was no created entries' });

  const diaries = entries.sort((a, b) => (new Date(b.createdOn)).getTime()
  - (new Date(a.createdOn).getTime()));

  res.status(200).json({ status: 200, data: diaries });
};

const createNewEntry = (req, res) => {
  const entry = new Entry(entries.length + 1, new Date().toLocaleString(), req.body.title, req.body.description);

  entries.push(entry);

  res.status(201).json({ status: 201, message: 'entry successfully created', data: entry });
};

const getOneEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  return res.status(200).json({ status: 200, data: entry });
};

const updateEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  entry.title = req.body.title;
  entry.description = req.body.description;

  return res.status(200).json({ status: 200, message: '​entry successfully updated', data: entry });
};

const deleteEntry = (req, res) => {
  const entry = entries.find((entry) => entry.id === parseInt(req.params.id, 10));

  if (!entry) return res.status(404).json({ status: 404, error: `There is no entry with id ${req.params.id} ` });

  const index = entries.indexOf(entry);

  entries.splice(index, 1);

  return res.status(200).json({ status: 200, message: '​entry successfully deleted' });
};


export { getAllEntries, createNewEntry, getOneEntry, updateEntry, deleteEntry };
