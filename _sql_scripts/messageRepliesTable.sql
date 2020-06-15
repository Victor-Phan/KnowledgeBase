CREATE TABLE IF NOT EXISTS `c4711_finalproject`.`messageReply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `message_id` INT NOT NULL,
  `reply` VARCHAR(200) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_message_reply_user_idx` FOREIGN KEY (`user_id`) REFERENCES `c4711_finalproject`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_message_reply_message_idx` FOREIGN KEY (`message_id`) REFERENCES `c4711_finalproject`.`message` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);