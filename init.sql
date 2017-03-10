-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `ads`;
CREATE TABLE `ads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float(9,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `ads` (`id`, `name`, `price`) VALUES
(1,	'Classic Ad',	269.99),
(2,	'Standout Ad',	322.99),
(3,	'Premium Ad',	394.99);

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `ads_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `ads_id` (`ads_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`ads_id`) REFERENCES `ads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `carts` (`id`, `customer_id`, `ads_id`, `quantity`) VALUES
(1,	5,	1,	1),
(2,	5,	2,	1),
(3,	5,	3,	1),
(4,	1,	1,	3),
(5,	1,	3,	1),
(6,	2,	2,	3),
(7,	2,	3,	1),
(8,	3,	3,	4);

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `customers` (`id`, `name`) VALUES
(1,	'Unilever'),
(2,	'Apple'),
(3,	'Nike'),
(4,	'Ford'),
(5,	'Default');

DROP TABLE IF EXISTS `privilege`;
CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `ads_id` int(11) NOT NULL,
  `rules_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `ads_id` (`ads_id`),
  KEY `rules_id` (`rules_id`),
  CONSTRAINT `privilege_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `privilege_ibfk_2` FOREIGN KEY (`ads_id`) REFERENCES `ads` (`id`) ON DELETE CASCADE,
  CONSTRAINT `privilege_ibfk_3` FOREIGN KEY (`rules_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `privilege` (`id`, `customer_id`, `ads_id`, `rules_id`) VALUES
(1,	1,	1,	1),
(2,	2,	2,	2),
(3,	3,	3,	3),
(4,	4,	1,	4),
(5,	4,	2,	5),
(6,	4,	3,	6);

DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `condition` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rules` (`id`, `type`, `condition`, `result`) VALUES
(1,	1,	'3',	'2'),
(2,	2,	'No Condition',	'299.99'),
(3,	3,	'>= 4',	'379.99'),
(4,	1,	'5',	'4'),
(5,	2,	'No Condition',	'309.99'),
(6,	3,	'>= 3',	'389.99');
