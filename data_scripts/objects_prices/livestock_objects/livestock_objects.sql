-- source for total_produced and total_ecological_footprint:
-- 1 - Working guidebook to NFA - 5.3.2 - Livestock intensity
-- year: 2013
-- source for ratio between live animal and available meat for beef:
-- https://www.oda.state.ok.us/food/fs-cowweight.pdf
-- Downloaded in February 2018
insert into p_object (id, name, object_type)
values (501, 'Beef meat - 1 kg', 2);
insert into p_livestock_object (object_id, total_produced, total_ecological_footprint, retail_cut_percent)
values (501, 328000000, 1035000, 0.43);
-- source for ratio between live animal and available meat for chicken:
-- http://www.housetohomestead.com/2011/03/chicken-math-how-much-meat-is-in-a-whole-chicken/
-- Downloaded in February 2018
insert into p_object (id, name, object_type)
values (502, 'Chicken meat - 1 kg', 2);
insert into p_livestock_object (object_id, total_produced, total_ecological_footprint, retail_cut_percent)
values (502, 59700000, 117500, 0.62);