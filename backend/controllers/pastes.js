const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Paste = require('../models/Paste');

// @desc      Create new paste
// @route     POST /api/v1/pastes
// @access    Private
exports.createPaste = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const paste = await Paste.create(req.body);

  res.status(201).json({
    success: true,
    data: paste,
  });
});

// @desc      Get all pastes
// @route     GET /api/v1/pastes/
// @access    Private
exports.getPastes = asyncHandler(async (req, res) => {
  const pastes = await Paste.find({
    user: req.user.id,
  });

  res.status(200).json({
    succes: true,
    count: pastes.length,
    data: pastes,
  });
});

// @desc      Get paste by ID
// @route     GET /api/v1/pastes/:id
// @access    Private
exports.getPaste = asyncHandler(async (req, res, next) => {
  const paste = await Paste.findById(req.params._id);

  if (!paste) {
    return next(
      new ErrorResponse(`No paste found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is paste owner
  if (paste.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to get this paste`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: paste });
});

// @desc      Update paste
// @route     PUT /api/v1/pastes/:id
// @access    Private
exports.updatePaste = asyncHandler(async (req, res, next) => {
  let paste = await Paste.findById(req.params._id);

  if (!paste) {
    return next(
      new ErrorResponse(`paste not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is paste owner
  if (paste.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update this paste`,
        401
      )
    );
  }

  paste = await Paste.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: paste });
});

// @desc      Delete paste
// @route     DELETE /api/v1/pastes/:id
// @access    Private
exports.deletePaste = asyncHandler(async (req, res, next) => {
  const paste = await Paste.findById(req.params._id);

  if (!paste) {
    return next(
      new ErrorResponse(`paste not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is paste owner
  if (paste.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User with id ${req.user._id} is not authorized to delete this paste`,
        401
      )
    );
  }

  paste.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
