const {
  posttypeModel,
  postModel,
  postcommentModel,
  userModel,
} = require('../models');

const {
  formatters: { completeDateFormatter },
} = require('../utils');

exports.getHomePage = async (req, res, next) => {
  try {
    const { id: user_id } = req.session.user;
    const postTypes = await posttypeModel.getPostTypes();
    const posts = await postModel.getAllPostsDESC();
    const [userDetails] = await userModel.getUserDetails(user_id);
    if (!userDetails) {
      throw new Error(`User not found: ${user_id}`);
    }

    //Get all comments within each post
    const processedPosts = posts.map(async (post) => {
      const postcomment = await postcommentModel.getPostComments(post.id);

      return {
        ...post,
        timestamp: completeDateFormatter(post.timestamp),
        postcomment,
      };
    });

    Promise.all(processedPosts)
      .then((posts) =>
        res.render('home', {
          userDetails,
          postTypes,
          posts,
          navbarCSS: true,
          homeCSS: true,
          homePageJS: true,
          postJS: true,
        })
      )
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
};
