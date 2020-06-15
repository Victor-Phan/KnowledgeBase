const { messageModel, messageReplyModel, userModel } = require('../models');
const {
  emailHandler,
  formatters: { dateFormatter },
} = require('../utils');

const messagePageCSS = { messagingCSS: true, navbarCSS: true };
const conversationsPageCSS = { conversationsCSS: true, navbarCSS: true };

const formatMessageDate = (message) => ({
  ...message,
  date: dateFormatter(message.date),
});

exports.getSendMessagePage = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (user_id === req.session.user.id) {
      return res.redirect('/messages');
    }
    const [user] = await userModel.getUserDetails(user_id);
    if (!user) {
      throw new Error(`User not found: ${user_id}`);
    }
    return res.render('messaging', { user, ...messagePageCSS });
  } catch (err) {
    next(err);
  }
};

exports.getUserMessages = async (req, res, next) => {
  try {
    const { id: user_id } = req.session.user;

    const [message] = await messageModel.getFirstMessageForUser(user_id);

    if (!message) {
      return res.render('conversations', conversationsPageCSS);
    }

    return res.redirect(`/messages/${message.id}`);
  } catch (err) {
    next(err);
  }
};

exports.getConversationPage = async (req, res, next) => {
  try {
    const { message_id } = req.params;
    const { id: user_id } = req.session.user;

    const unprocessedMessages = await messageModel.getAllMessagesForUser(user_id);

    const messages = unprocessedMessages.map(formatMessageDate);

    const [selectedMessage] = await messageModel.getMessage(message_id);

    const rawMessageReplies = await messageReplyModel.getAllMessageReplies(
      message_id
    );

    const unprocessedMessageReplies = [selectedMessage, ...rawMessageReplies];

    const messageReplies = unprocessedMessageReplies.map(formatMessageDate);

    return res.render('conversations', {
      messages,
      messageReplies,
      selectedMessage,
      ...conversationsPageCSS,
    });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { id: sender_id } = req.session.user;
    const { user_id: recipient_id } = req.params;
    const { subject, message } = req.body;
    const e = { sender_id, recipient_id, subject, message };
    await messageModel.insertMessage(e);
    return res.redirect(`/sendmessage/${recipient_id}`);
  } catch (err) {
    next(err);
  }
};

exports.sendEmailMessage = async (req, res, next) => {
  try {
    const { id: sender_id } = req.session.user;
    const { subject, message } = req.body;
    const { user_id: recipient_id } = req.params;
    const e = { sender_id, recipient_id, subject, message };

    const [sender] = await userModel.getUserDetails(sender_id);
    if (!sender) {
      throw new Error(`User not found: ${user_id}`);
    }

    const [receiver] = await userModel.getUserDetails(recipient_id);
    if (!receiver) {
      throw new Error(`User not found: ${user_id}`);
    }

    await messageModel.insertMessage(e);

    const mailOptions = {
      to: receiver.email,
      subject: `From: ${sender.email}: ${e.subject}`,
      text: e.message,
    };

    await emailHandler.sendEmail(mailOptions);

    return res.redirect(`/profile/${recipient_id}`);
  } catch (err) {
    next(err);
  }
};
