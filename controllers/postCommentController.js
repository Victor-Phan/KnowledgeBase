const { postcommentModel } = require('../models');

exports.add = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const { id: user_id } = req.session.user;
    const { comment } = req.body;

    await postcommentModel.insertPostComment({ post_id, user_id, comment });

    return res.redirect(`/posts/${post_id}`);
  } catch (err) {
    next(err);
  }
};
