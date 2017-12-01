-- ---
-- Globals
-- ---
DROP DATABASE IF EXISTS ussvengeance_dev;

CREATE DATABASE ussvengeance_dev;

USE ussvengeance_dev;
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
  `is_band` BINARY NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT(10000) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `age` INTEGER(111) NULL DEFAULT NULL,
  `zip` INTEGER(20) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `state` TEXT(50) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `credits` INTEGER(255) NULL DEFAULT 50,
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
  `description` TEXT(10000) NULL DEFAULT NULL,
  `city` TEXT(255) NULL DEFAULT NULL,
  `state` TEXT(50) NULL DEFAULT NULL,
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
  `user_id` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT(10000) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `start_time` TIME NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `final_commit_date` DATE NULL DEFAULT NULL,
  `city` CHAR(255) NULL DEFAULT NULL,
  `state` CHAR(50) NULL DEFAULT NULL,
  `zip` INTEGER(20) NULL DEFAULT NULL,
  `is_committed` BINARY NULL DEFAULT NULL,
  `price` INTEGER(255) NULL DEFAULT NULL,
  `min_commits` INTEGER(255) NULL DEFAULT NULL,
  `commits` INTEGER(255) NULL DEFAULT NULL,
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
  `user_id` INTEGER NULL DEFAULT NULL,
  `link_url` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table Properties
-- ---

ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Venue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Event` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Attendance` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `Properties` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Event` ADD FOREIGN KEY (venue_id) REFERENCES `Venue` (`id`);
ALTER TABLE `Event` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Properties` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Attendance` ADD FOREIGN KEY (event_id) REFERENCES `Event` (`id`);
ALTER TABLE `Attendance` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);

-- ---
-- Test Data
-- ---

INSERT INTO `Users` (`id`,`google_id`,`is_band`, `name`,`description`,`email`,`age`,`zip`,`city`,`state`,`photo`,`status`,`credits`) VALUES
  ('','goog1', '0','james fannerly','loves trombones','parade@gmail.com','33','12345','spokane','IA','pic.svg','','');

INSERT INTO `Users` (`id`,`google_id`,`name`,`is_band`,`description`,`email`,`zip`,`city`,`state`,`photo`,`status`,`credits`) VALUES
('','goog2','Monsoon Of Sound', '1','weather music','monsoon@gmail.com','34567','new york','NY','photo.jpeg','','');

INSERT INTO `Venue` (`id`,`name`,`description`,`city`,`state`,`zip`,`location`) VALUES
('','Music Hut','The last straw','Muskogee','OK','56789','here');

INSERT INTO `Event` (`id`,`venue_id`,`user_id`,`name`,`description`,`photo`,`start_date`,`start_time`,`end_date`,`final_commit_date`,`city`,`state`,`zip`,`is_committed`,`price`,`min_commits`,`commits`) VALUES
('','1','2','Event Fest','we got the musics','picture.png','10-10-2017','8:00pm','10-11-2017','10-09-2017','hoboken','NJ','23456','1','10','5','7');

INSERT INTO `Attendance` (`id`,`event_id`,`user_id`) VALUES
('','1','1');

INSERT INTO `Properties` (`id`,`user_id`,`link_url`,`description`) VALUES
('','1','www.bands.com','test band links');