-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.27 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for masakape
CREATE DATABASE IF NOT EXISTS `masakape` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `masakape`;


-- Dumping structure for table masakape.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(10) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `recipe_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe3_key` (`recipe_id`),
  CONSTRAINT `recipe3_key` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.cuisine
CREATE TABLE IF NOT EXISTS `cuisine` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cuisine` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.ingredient
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(10) NOT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.occasion
CREATE TABLE IF NOT EXISTS `occasion` (
  `id` int(10) NOT NULL,
  `occasion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.recipe
CREATE TABLE IF NOT EXISTS `recipe` (
  `id` int(10) NOT NULL,
  `recipe` varchar(255) NOT NULL,
  `cuisine_id` int(10) NOT NULL,
  `preparation` multilinestring NOT NULL,
  `photo` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cuisine_key` (`cuisine_id`),
  CONSTRAINT `cuisine_key` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.recipe_ingredient
CREATE TABLE IF NOT EXISTS `recipe_ingredient` (
  `recipe_id` int(10) NOT NULL,
  `ingredient_id` int(10) NOT NULL,
  KEY `recipe_key` (`recipe_id`),
  KEY `ingredient_key` (`ingredient_id`),
  CONSTRAINT `ingredient_key` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_key` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table masakape.recipe_occasion
CREATE TABLE IF NOT EXISTS `recipe_occasion` (
  `recipe_id` int(10) NOT NULL,
  `occasion_id` int(10) NOT NULL,
  KEY `recipe2_key` (`recipe_id`),
  KEY `occasion_key` (`occasion_id`),
  CONSTRAINT `occasion_key` FOREIGN KEY (`occasion_id`) REFERENCES `occasion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe2_key` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
