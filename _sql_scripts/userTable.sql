CREATE TABLE IF NOT EXISTS `c4711_finalproject`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` CHAR(64) NOT NULL,
  `image_url` VARCHAR(100) NOT NULL,
  `about` VARCHAR(100) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  PRIMARY KEY (`id`));