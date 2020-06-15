const {
  userModel,
  postModel,
  postcommentModel,
  profilelikeModel,
} = require('../models');

exports.getProfile = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const [user] = await userModel.getUserDetails(user_id);
    if (!user) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    const posts = await postModel.getAllPostsByUser(user_id);

    const [likes] = await profilelikeModel.hasUserLiked(
      req.session.user.id,
      user_id
    );

    const hasLiked = !!likes.count;

    const processedPosts = posts.map(async (post) => {
      const [numOfRepliesData] = await postcommentModel.getNumberComments(
        post.id
      );
      const numberOfReplies = numOfRepliesData.count;

      const postcomment = await postcommentModel.getPostComments(post.id);

      return {
        numberOfReplies,
        postcomment,
        ...post,
      };
    });

    // This will need to change
    Promise.all(processedPosts)
      .then((posts) =>
        res.render('profile', {
          posts,
          user,
          hasLiked,
          postCSS: true,
          postJS: true,
          profileCSS: true,
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

exports.getEditPage = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const [user] = await userModel.getUserDetails(user_id);
    if (!user) {
      throw new Error(`No such user with id: ${user_id}`);
    }

    return res.render('editProfile', { user, navbarCSS: true, profileEditCSS: true });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.session.user;

    await userModel.updateUser({ id, ...req.body });

    return res.redirect('/profile');
  } catch (err) {
    next(err);
  }
};
