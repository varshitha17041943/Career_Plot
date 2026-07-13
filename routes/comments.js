const express = require('express');
const router = express.Router();
const { addComment, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, addComment);
router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
