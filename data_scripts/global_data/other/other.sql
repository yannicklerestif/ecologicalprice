-- World total biocapacity
-- Year: 2013
-- Downloaded in january 2018 from:
-- http://data.footprintnetwork.org/#/countryTrends?cn=5001&type=BCtot,EFCtot
CREATE TABLE `world_total_biocapacity` (
  `value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `world_total_biocapacity` (`value`)
VALUES (12233516313.9);
