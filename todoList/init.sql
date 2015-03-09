CREATE DATABASE todoList;
USE todoList;

CREATE TABLE IF NOT EXISTS `todoItems` (
	`id` SMALLINT unsigned NOT NULL AUTO_INCREMENT,
	`title` TINYTEXT COLLATE utf8_unicode_ci NOT NULL,
	`description` TEXT COLLATE utf8_unicode_ci NOT NULL,
	`completed` bit NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO todoItems (
    title, 
    description, 
    completed
) VALUES (
    "Test", 
    "Test row.", 
    0
)