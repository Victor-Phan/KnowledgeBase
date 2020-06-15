CREATE TABLE IF NOT EXISTS `c4711_finalproject`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  `subject` VARCHAR(45) NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_message_user_recipient_idx` FOREIGN KEY (`recipient_id`) REFERENCES `c4711_finalproject`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_message_user_sender_idx` FOREIGN KEY (`sender_id`) REFERENCES `c4711_finalproject`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);