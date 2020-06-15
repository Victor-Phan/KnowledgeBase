const { postModel, postcommentModel } = require('../models');

exports.add = async (req, res, next) => {
  try {
    const newPost = req.body;

    newPost.user_id = req.session.user.id;

    const { insertId } = await postModel.insertPost(newPost);

    return res.redirect(`/posts/${insertId}`);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    let { type, subject } = req.query;
    let data;

    if (type) {
      data = await postModel.getPostsByType(type);
    } else if (subject) {
      data = await postModel.getPostsBySubject(subject);
    } else {
      throw new Error('Invalid search');
    }

    //Get all comments within each post
    const processedPosts = data.map(async (post) => {
      const postcomment = await postcommentModel.getPostComments(post.id);

      return {
        ...post,
        postcomment,
      };
    });

    Promise.all(processedPosts)
      .then((posts) =>
        res.render('postList', {
          posts,
          ...(!!subject ? { term: subject } : {}),
          postCSS: true,
          postJS: true,
          navbarCSS: true,
        })
      )
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const data = await postModel.getAllPostsByUser(id);

    //Get all comments within each post
    const processedPosts = data.map(async (post) => {
      const postcomment = await postcommentModel.getPostComments(post.id);

      return {
        ...post,
        postcomment,
      };
    });

    Promise.all(processedPosts)
      .then((posts) =>
        res.render('postList', {
          posts,
          navbarCSS: true,
          postJS: true,
          postCSS: true,
        })
      )
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const data = await postModel.getPostWithAllProperties(post_id);

    if (data.length === 0) {
      throw new Error(`No such post with id: ${post_id}`);
    }

    //Get all comments within each post
    const processedPosts = data.map(async (post) => {
      const postcomment = await postcommentModel.getPostComments(post.id);

      return {
        ...post,
        postcomment,
      };
    });

    Promise.all(processedPosts)
      .then((posts) =>
        res.render('postList', {
          posts,
          navbarCSS: true,
          postJS: true,
          postCSS: true,
        })
      )
      .catch((err) => {
        throw err;
      });

  } catch (err) {
    next(err);
  }
};
