const { Post, User, Comment, Like } = require('../models');
const { Op } = require('sequelize');

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.create({
      title,
      content,
      category,
      authorId: req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10, authorId } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }
    if (category) {
      where.category = category;
    }
    if (authorId) {
      where.authorId = authorId;
    }

    const posts = await Post.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatar'] },
        { model: Like, as: 'likes', attributes: ['id', 'userId'] }
      ],
      distinct: true
    });

    res.json({
      total: posts.count,
      pages: Math.ceil(posts.count / limit),
      currentPage: parseInt(page),
      posts: posts.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatar'] },
        { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['id', 'username', 'avatar'] }] },
        { model: Like, as: 'likes', attributes: ['id', 'userId'] }
      ],
      order: [[{ model: Comment, as: 'comments' }, 'createdAt', 'DESC']]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ where: { postId, userId } });

    if (existingLike) {
      await existingLike.destroy();
      return res.json({ message: 'Post unliked', liked: false });
    } else {
      await Like.create({ postId, userId });
      return res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, toggleLike };
