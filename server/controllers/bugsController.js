const fsPromises = require('fs').promises;
const path = require('path');

const bugsDB = {
  bugs: require('../models/bugs.json'),
  setBugs(data) {
    this.bugs = data;
  },
};

const getAllBugs = (req, res) => {
  res.json(bugsDB.bugs);
};

const createNewBug = async (req, res) => {
  const newBug = { id: Date.now(), resolved: false, ...req.body };

  if (!newBug.description) {
    return res
      .status(400)
      .json({ message: 'A description of the bug is required.' });
  }

  bugsDB.setBugs([...bugsDB.bugs, newBug]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'models', 'bugs.json'),
    JSON.stringify(bugsDB.bugs)
  );
  res.status(201).json(bugsDB.bugs);
};

const resolveBug = async (req, res) => {
  const bug = bugsDB.bugs.find((bug) => bug.id === parseInt(req.params.id));
  if (!bug) {
    return res
      .status(400)
      .json({ message: `Bug ID ${req.params.id} not found` });
  }
  if ('resolved' in req.body) bug.resolved = req.body.resolved;
  if ('userId' in req.body) bug.userId = req.body.userId;

  const filteredArray = bugsDB.bugs.filter(
    (bug) => bug.id !== parseInt(req.params.id)
  );
  const unsortedArray = [...filteredArray, bug];
  bugsDB.setBugs(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'models', 'bugs.json'),
    JSON.stringify(bugsDB.bugs)
  );
  res.json(bug);
};

module.exports = {
  getAllBugs,
  createNewBug,
  resolveBug,
};
