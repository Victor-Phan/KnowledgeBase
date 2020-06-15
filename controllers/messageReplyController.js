const { messageReplyModel } = require('../models');

exports.addMessageReply = async (req, res, next) => {
  try {
    const { message_id } = req.params;
    const { id: user_id } = req.session.user;
    const reply = {
      message_id,
      user_id,
      ...req.body,
    };
    await messageReplyModel.insertMessageReply(reply);
    return res.redirect(`/messages/${reply.message_id}`);
  } catch (err) {
    next(err);
  }
};
