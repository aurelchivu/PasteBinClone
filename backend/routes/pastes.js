const express = require('express');
const {
  createPaste,
  getPastes,
  getPaste,
  updatePaste,
  deletePaste,
} = require('../controllers/pastes');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').post(createPaste).get(getPastes);

router
  .route('/:_id')
  .get(getPaste)
  .put(updatePaste)
  .delete(deletePaste);

module.exports = router;
