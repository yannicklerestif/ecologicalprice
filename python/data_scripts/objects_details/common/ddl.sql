CREATE TABLE `p_CO2_ecological_footprint` (
  `value` double NOT NULL COMMENT 'ecological footprint of one kg of CO2, in gha / year',
  `source_id` int(11) DEFAULT NULL,
  `comment` varchar(4096) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_CO2_object` (
  `object_id` int(11) NOT NULL,
  `CO2_cost` double NOT NULL COMMENT 'in kg of CO2',
  `source` int(11) DEFAULT NULL,
  `comment` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_compound_object_link` (
  `object_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `comment` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_crop_object` (
  `object_id` int(11) NOT NULL,
  `FAO_code` int(11) NOT NULL,
  `yield` double NOT NULL COMMENT 'in tons / ha',
  `crop_intensity` double NOT NULL COMMENT 'number of harvests per year'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_equivalent_factor` (
  `type_id` int(11) NOT NULL,
  `ef` double NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `comment` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_livestock_object` (
  `object_id` int(11) NOT NULL,
  `total_produced` double NOT NULL,
  `total_ecological_footprint` double NOT NULL,
  `retail_cut_percent` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_object` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `object_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `p_object_type` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `source` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `p_CO2_object`
  ADD PRIMARY KEY (`object_id`);

ALTER TABLE `p_compound_object_link`
  ADD UNIQUE KEY `object_id` (`object_id`,`parent_id`) USING BTREE;

ALTER TABLE `p_crop_object`
  ADD PRIMARY KEY (`object_id`),
  ADD UNIQUE KEY `FAO_code` (`FAO_code`);

ALTER TABLE `p_equivalent_factor`
  ADD PRIMARY KEY (`type_id`);

ALTER TABLE `p_livestock_object`
  ADD PRIMARY KEY (`object_id`);

ALTER TABLE `p_object`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `p_object_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `source`
  ADD PRIMARY KEY (`id`);