CREATE TABLE `c4711_finalproject`.`postcomment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `comment` VARCHAR(200) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `FK_postcomment_post_idx` (`post_id` ASC),
  INDEX `FK_postcomment_user_idx` (`user_id` ASC),
  CONSTRAINT `FK_postcomment_post`
    FOREIGN KEY (`post_id`)
    REFERENCES `c4711_finalproject`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_postcomment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `c4711_finalproject`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
