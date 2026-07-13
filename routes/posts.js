const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost, toggleLike } = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, toggleLike);

module.exports = router;
