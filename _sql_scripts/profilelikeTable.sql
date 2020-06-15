CREATE TABLE `c4711_finalproject`.`profilelike` (
  `user_profile_liked` INT NOT NULL,
  `user_liked_profile` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_liked_profile`, `user_profile_liked`),
  INDEX `FK_profilelike_user_liked_idx` (`user_profile_liked` ASC),
  CONSTRAINT `FK_profilelike_user_liker`
    FOREIGN KEY (`user_liked_profile`)
    REFERENCES `c4711_finalproject`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_profilelike_user_liked`
    FOREIGN KEY (`user_profile_liked`)
    REFERENCES `c4711_finalproject`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
