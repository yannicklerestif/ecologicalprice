DROP TABLE IF EXISTS `g_country_currency`;
CREATE TABLE IF NOT EXISTS `g_country_currency` (
  `country_code` char(2) CHARACTER SET ascii NOT NULL,
  `currency_code` char(3) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`country_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX g_country_currency_index ON `g_country_currency` (`country_code`, currency_code);

DROP TABLE IF EXISTS `g_currency`;
CREATE TABLE IF NOT EXISTS `g_currency` (
  `code` char(3) CHARACTER SET ascii NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `symbol` varchar(64) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `g_currency_exchange_rate`;
CREATE TABLE IF NOT EXISTS `g_currency_exchange_rate` (
  `currency_code` char(3) CHARACTER SET ascii NOT NULL,
  `units_per_USD` double NOT NULL,
  PRIMARY KEY (`currency_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
