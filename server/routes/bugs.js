const express = require('express');
const bugsController = require('../controllers/bugsController');
const router = express.Router();

router
  .route('/')
  .get(bugsController.getAllBugs)
  .post(bugsController.createNewBug);

router.route('/:id').patch(bugsController.resolveBug);

module.exports = router;
