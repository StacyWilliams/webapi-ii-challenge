const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
}); //endpoint works

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Could not find post  with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
}); //endpoint works

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Posts.findCommentById(id);

    if (comments.length) {
      res.json(comments);
    } else {
      res.status(404).json({ message: 'Could not find comments for given post' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get comments' });
  }
}); //endpoint works

router.post('/', async (req, res) => {
  const postData = req.body;

  try {
    const post = await Posts.insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new post' });
  }
}); //endpoint works

router.post('/:id/comments', async (req, res) => {
  const commentData = req.body;
  const { id } = req.params; 

  try {
    const comment = await Posts.findCommentsById(id);

    if (comment) {
      const comment = await Posts.insertComment(commentData, id);
      res.status(201).json(comment);
    } else {
      res.status(404).json({ message: 'Could not find comment with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new comment' });
  }
}); //endpoint works

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
 console.log(changes)
  try {
    const [post] = await Posts.findById(id);

    if (post) {
      const updatedPost = await Posts.update(id, changes);
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Could not find post with given id' });
    }
  } catch (err) {
      console.log(err)
    res.status(500).json({ message: 'Failed to update post' });
  }
}); //endpoint works

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Posts.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find post with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
}); //endpoint works

module.exports = router;