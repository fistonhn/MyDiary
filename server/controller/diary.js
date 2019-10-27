const entries = [];

const getAllEntries = (req, res) => {
  const entryFound = entries.find((entry) => entry);

  if (!entryFound) return res.status(404).json({ status: 404, error: 'There was no created entries' });

  const diaries = entries.sort((a, b) => (new Date(b.createdOn)).getTime()
  - (new Date(a.createdOn).getTime()));

  res.status(200).json({ status: 200, data: diaries });
};


export { getAllEntries };
