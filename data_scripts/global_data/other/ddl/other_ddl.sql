-- World total biocapacity
-- Year: 2013
-- Downloaded in january 2018 from:
-- http://data.footprintnetwork.org/#/countryTrends?cn=5001&type=BCtot,EFCtot
DROP TABLE IF EXISTS `g_world_total_biocapacity`;
CREATE TABLE `g_world_total_biocapacity` (
  `value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `g_world_total_biocapacity` (`value`)
VALUES (12233516313.9);

DROP TABLE IF EXISTS `g_world_ppp_gdp`;
CREATE TABLE `g_world_ppp_gdp` (
  `value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
