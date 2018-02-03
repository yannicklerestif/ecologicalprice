DROP TABLE IF EXISTS `g_country_avg_prices`;
CREATE TABLE `g_country_avg_prices` (
  `country_code` char(2) CHARACTER SET ascii NOT NULL,
  `country_avg_prices` double NOT NULL,
  PRIMARY KEY (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
