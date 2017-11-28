-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
		
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `google_id` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` MEDIUMTEXT(10000) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `age` INTEGER(1000) NULL DEFAULT NULL,
  `zip` INTEGER(20) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `state` MEDIUMTEXT(50) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `credits` INTEGER(10000000) NULL DEFAULT 50,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Bands'
-- 
-- ---

DROP TABLE IF EXISTS `Bands`;
		
CREATE TABLE `Bands` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `google_id` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` MEDIUMTEXT(10000) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `zip` INTEGER(20) NULL DEFAULT NULL,
  `current_zip` INTEGER(20) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `state` MEDIUMTEXT(50) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `credits` INTEGER(10000000) NULL DEFAULT 55,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Venue'
-- 
-- ---

DROP TABLE IF EXISTS `Venue`;
		
CREATE TABLE `Venue` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` MEDIUMTEXT(10000) NULL DEFAULT NULL,
  `city` MEDIUMTEXT(255) NULL DEFAULT NULL,
  `state` MEDIUMTEXT(50) NULL DEFAULT NULL,
  `zip` INTEGER(5) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Event'
-- 
-- ---

DROP TABLE IF EXISTS `Event`;
		
CREATE TABLE `Event` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `venue_id` INTEGER NULL DEFAULT NULL,
  `band_id` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` MEDIUMTEXT(10000) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `start_time` TIME NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `final_commit_date` DATE NULL DEFAULT NULL,
  `city` CHAR(255) NULL DEFAULT NULL,
  `state` CHAR(50) NULL DEFAULT NULL,
  `zip` INTEGER(20) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `price` INTEGER(10000) NULL DEFAULT NULL,
  `min_commits` INTEGER(100000) NULL DEFAULT NULL,
  `commits` INTEGER(100000) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Attendance'
-- 
-- ---

DROP TABLE IF EXISTS `Attendance`;
		
CREATE TABLE `Attendance` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Properties'
-- 
-- ---

DROP TABLE IF EXISTS `Properties`;
		
CREATE TABLE `Properties` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `band_id` INTEGER NULL DEFAULT NULL,
  `link_url` VARCHAR(255) NULL DEFAULT NULL,
  `description` MEDIUMTEXT(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Event` ADD FOREIGN KEY (venue_id) REFERENCES `Venue` (`id`);
ALTER TABLE `Event` ADD FOREIGN KEY (band_id) REFERENCES `Bands` (`id`);
ALTER TABLE `Attendance` ADD FOREIGN KEY (event_id) REFERENCES `Event` (`id`);
ALTER TABLE `Attendance` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Properties` ADD FOREIGN KEY (band_id) REFERENCES `Bands` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Bands` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Venue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Event` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Attendance` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Properties` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`google_id`,`name`,`description`,`email`,`age`,`zip`,`city`,`state`,`photo`,`status`,`credits`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `Bands` (`id`,`google_id`,`name`,`description`,`email`,`zip`,`current_zip`,`city`,`state`,`photo`,`status`,`credits`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `Venue` (`id`,`name`,`description`,`city`,`state`,`zip`,`location`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Event` (`id`,`venue_id`,`band_id`,`name`,`description`,`photo`,`start_date`,`start_time`,`end_date`,`final_commit_date`,`city`,`state`,`zip`,`status`,`price`,`min_commits`,`commits`) VALUES
-- ('','','','','','','','','','','','','','','','','');
-- INSERT INTO `Attendance` (`id`,`event_id`,`user_id`) VALUES
-- ('','','');
-- INSERT INTO `Properties` (`id`,`band_id`,`link_url`,`description`) VALUES
-- ('','','','');