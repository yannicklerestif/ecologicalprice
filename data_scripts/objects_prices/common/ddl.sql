CREATE TABLE IF NOT EXISTS `p_object` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `object_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `p_crop_object` (
  `object_id` int(11) NOT NULL,
  `FAO_code` int(11) NOT NULL,
  `yield` double NOT NULL COMMENT 'in tons / ha',
  `crop_intensity` double NOT NULL COMMENT 'number of harvests per year',
  PRIMARY KEY (`object_id`),
  UNIQUE KEY `FAO_code` (`FAO_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `p_livestock_object` (
  `object_id` int(11) NOT NULL,
  `total_produced` double not null,
  `total_ecological_footprint` double not null,
  `retail_cut_percent` double not null,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



