const { insertLike, removeLike } = require('../models/profilelike');

exports.toggleLike = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { other_user_id, isLike } = req.body;

    const data = {
      user_profile_liked: other_user_id,
      user_liked_profile: id,
    };

    !!parseInt(isLike) ? await insertLike(data) : await removeLike(data);

    return res.redirect(`/profile/${other_user_id}`);
  } catch (err) {
    next(err);
  }
};
