DROP TABLE IF EXISTS `g_country`;
CREATE TABLE IF NOT EXISTS `g_country` (
  `code` char(2) CHARACTER SET ascii NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
