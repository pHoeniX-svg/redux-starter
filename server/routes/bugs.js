const express = require('express');
const router = express.Router();

const data = {};
data.bugs = require('../data/bugs.json');

router
  .route('/')
  .get((req, res) => {
    res.json(data.bugs);
  })
  .post((req, res) => {
    const bug = { id: Date.now(), resolved: false, ...req.body };
    data.bugs.push(bug);
    res.json(bug);
  });

router.route('/:id').patch((req, res) => {
  const index = data.bugs.findIndex(
    (bug) => bug.id === parseInt(req.params.id)
  );
  const bug = data.bugs[index];
  if ('resolved' in req.body) bug.resolved = req.body.resolved;
  if ('userId' in req.body) bug.userId = req.body.userId;

  res.json(bug);
});

module.exports = router;
