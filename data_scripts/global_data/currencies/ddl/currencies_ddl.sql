DROP TABLE IF EXISTS `country_currency`;
CREATE TABLE IF NOT EXISTS `country_currency` (
  `country_code` char(2) CHARACTER SET ascii NOT NULL,
  `currency_code` char(3) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`country_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX country_currency_index ON `country_currency` (`country_code`, currency_code);

DROP TABLE IF EXISTS `currency`;
CREATE TABLE IF NOT EXISTS `currency` (
  `code` char(3) CHARACTER SET ascii NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `symbol` varchar(64) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `currency_exchange_rate`;
CREATE TABLE IF NOT EXISTS `currency_exchange_rate` (
  `currency_code` char(3) CHARACTER SET ascii NOT NULL,
  `units_per_USD` double NOT NULL,
  PRIMARY KEY (`currency_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
