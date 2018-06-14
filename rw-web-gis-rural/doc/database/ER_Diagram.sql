
/* Drop Tables */

DROP TABLE IF EXISTS bookmarks;
DROP TABLE IF EXISTS village;
DROP TABLE IF EXISTS cell;
DROP TABLE IF EXISTS chamber;
DROP TABLE IF EXISTS sector;
DROP TABLE IF EXISTS management;
DROP TABLE IF EXISTS wss;
DROP TABLE IF EXISTS district;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS pipeline;
DROP TABLE IF EXISTS private_operator;
DROP TABLE IF EXISTS province;
DROP TABLE IF EXISTS pumping_station;
DROP TABLE IF EXISTS reservoir;
DROP TABLE IF EXISTS waterfacilities;
DROP TABLE IF EXISTS watersource;
DROP TABLE IF EXISTS water_connection;
DROP TABLE IF EXISTS Status;




/* Create Tables */

-- the table manages the location of bookmark. it requires for leaflet.bookmark plugin.
CREATE TABLE bookmarks
(
	id varchar(20) NOT NULL,
	name varchar(100) NOT NULL,
	latlng double precision[][] NOT NULL,
	zoom int NOT NULL,
	editable boolean NOT NULL,
	removable boolean NOT NULL,
	PRIMARY KEY (id)
) WITHOUT OIDS;


-- This table manages boundary of cells in Rwanda. The data requires by NISR.
CREATE TABLE cell
(
	cell_id int NOT NULL,
	cell varchar(50) NOT NULL,
	prov_id int NOT NULL,
	dist_id int NOT NULL,
	sect_id int NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (cell_id)
) WITHOUT OIDS;


-- This table manages the location of chambers. Chambers should includes following objects;
-- Washout Chamber,
-- Valve Chamber,
-- Starting Chamber,
-- Collection Chamber,
-- Air Release Chamber,
-- PRV Chamber
CREATE TABLE chamber
(
	chamber_id serial NOT NULL,
	-- Washout Chamber
	-- Valve Chamber
	-- Starting Chamber
	-- Collection Chamber
	-- Air Release Chamber
	-- PRV Chamber
	chamber_type varchar(50) NOT NULL,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year varchar(50),
	chamber_size varchar(100),
	material varchar(50),
	status int NOT NULL,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	-- true: using for breaking pressure,
	-- false: not using for breaking pressure.
	is_breakpressure boolean DEFAULT 'false' NOT NULL,
	PRIMARY KEY (chamber_id)
) WITHOUT OIDS;


-- This table manages boundary of districts in Rwanda. The data requires by NISR.
CREATE TABLE district
(
	dist_id int NOT NULL,
	district varchar(50) NOT NULL,
	prov_id int NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (dist_id)
) WITHOUT OIDS;


-- This table manages the location of feedbacks from customer. the "contents" column should have contents of feedback as JSON format.
CREATE TABLE feedbacks
(
	feedback_id serial NOT NULL,
	-- JSON object format
	contents text NOT NULL,
	-- geometry(POINT,4326)
	geom  NOT NULL,
	input_date date DEFAULT now() NOT NULL,
	-- Accepted
	-- Ongoing
	-- Resolved
	progress varchar(20) NOT NULL,
	updated_date date,
	comments_from_office text,
	PRIMARY KEY (feedback_id)
) WITHOUT OIDS;


-- the table manages the relationship between water supply sytem table and private operator table.
CREATE TABLE management
(
	management_id serial NOT NULL,
	wss_id int NOT NULL,
	po_id int NOT NULL,
	-- it is the year started the contract between water supply system and private operator.
	start_year int NOT NULL,
	-- If 'end_year' is null, it means that private operator still be in-charge for the water supply system.
	-- Please enter the year when the contract between private operator and water supply system.
	end_year int,
	PRIMARY KEY (management_id),
	UNIQUE (wss_id, po_id, start_year)
) WITHOUT OIDS;


-- This table manages the location of pipeline.
CREATE TABLE pipeline
(
	pipe_id serial NOT NULL,
	wss_id int,
	material varchar(50),
	pipe_size double precision,
	pressure varchar(50),
	constructed_year varchar(50),
	rehabilitated_year varchar(50),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	observation varchar(200),
	PRIMARY KEY (pipe_id)
) WITHOUT OIDS;


-- this table manages the data of private operator in Rwanda.
CREATE TABLE private_operator
(
	po_id int NOT NULL,
	po_name varchar(100) NOT NULL,
	PRIMARY KEY (po_id)
) WITHOUT OIDS;


-- This table manages boundary of provinces in Rwanda. The data requires by NISR.
CREATE TABLE province
(
	prov_id int NOT NULL,
	prov_name varchar(50) NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (prov_id)
) WITHOUT OIDS;


-- This table manages the location of pumping stations.
CREATE TABLE pumping_station
(
	pumpingstation_id serial NOT NULL,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year varchar(50),
	-- true: there is water meter,
	-- false: thre is no water meter
	water_meter boolean DEFAULT '0' NOT NULL,
	status int NOT NULL,
	head_pump varchar(50),
	power_pump varchar(50),
	discharge_pump varchar(50),
	pump_type varchar(50),
	power_source varchar(50),
	no_pump int,
	kva_generator varchar(20),
	no_generator int DEFAULT 0,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (pumpingstation_id)
) WITHOUT OIDS;


-- This table manages the location of reservoirs.
CREATE TABLE reservoir
(
	reservoir_id serial NOT NULL,
	-- Ground
	-- Underground
	-- Elevated
	reservoir_type varchar(50),
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year varchar(50),
	capacity int,
	material varchar(50),
	-- true: there is water meter,
	-- false: thre is no water meter
	water_meter boolean DEFAULT '0' NOT NULL,
	status int NOT NULL,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	-- true: using for breaking pressure,
	-- false: not using for breaking pressure.
	is_breakpressure boolean DEFAULT 'false' NOT NULL,
	PRIMARY KEY (reservoir_id)
) WITHOUT OIDS;


-- This table manages boundary of sectors in Rwanda. The data requires by NISR.
CREATE TABLE sector
(
	sect_id int NOT NULL,
	sector varchar(50) NOT NULL,
	prov_id int NOT NULL,
	dist_id int NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (sect_id)
) WITHOUT OIDS;


-- 0:N/A
-- 1:Full Functional
-- 2:Partially Functional
-- 3:Abandoned
CREATE TABLE Status
(
	Code int NOT NULL,
	Name varchar(50) NOT NULL,
	PRIMARY KEY (Code)
) WITHOUT OIDS;


-- This table manages boundary of villages in Rwanda. The data requires by NISR.
CREATE TABLE village
(
	vill_id int NOT NULL,
	village varchar(50) NOT NULL,
	prov_id int NOT NULL,
	dist_id int NOT NULL,
	sect_id int NOT NULL,
	cell_id int NOT NULL,
	geom  NOT NULL,
	population int DEFAULT 0 NOT NULL,
	household int DEFAULT 0 NOT NULL,
	PRIMARY KEY (vill_id)
) WITHOUT OIDS;


-- This table manages the location of handpumps and improved springs.
CREATE TABLE waterfacilities
(
	id serial NOT NULL,
	wsf_code varchar,
	-- Handpump
	-- Improved Spring
	wsf_type varchar,
	altitude int,
	serv_area_villages varchar,
	serv_popu_personals int,
	serv_popu_households int,
	type_water_source varchar,
	no_water_source int,
	hand_pump_type_name varchar,
	year_construction int,
	fund varchar,
	status int NOT NULL,
	observation varchar,
	geom ,
	PRIMARY KEY (id)
) WITHOUT OIDS;


-- This table manages the location of water sources which is ground water or spring water.
CREATE TABLE watersource
(
	watersource_id serial NOT NULL,
	wss_id int NOT NULL,
	-- Ground Water
	-- Spring
	source_type varchar(50),
	discharge double precision,
	constructed_year int,
	rehabilitated_year varchar(50),
	-- true: there is water meter,
	-- false: thre is no water meter
	water_meter boolean DEFAULT '0' NOT NULL,
	status int NOT NULL,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (watersource_id)
) WITHOUT OIDS;


-- This table manages the location of water connections which is water kiosk or public tap.
CREATE TABLE water_connection
(
	connection_id serial NOT NULL,
	-- Water Kiosk
	-- Public Tap
	connection_type varchar(50),
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year varchar(50),
	no_user int,
	-- true: there is water meter,
	-- false: thre is no water meter
	water_meter boolean DEFAULT '0' NOT NULL,
	status int NOT NULL,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (connection_id)
) WITHOUT OIDS;


-- This table manages boundary each water supply systems in RWSS. every wss belong to a district id.
-- 
-- The following SQL will update all boundaries from pipeline data.
-- ===========================================
-- update wss
-- set geom = a.geom
-- from(
-- SELECT wss_id, st_multi(st_buffer(st_union(geom),0.001)) as geom
--   FROM pipeline
--   group by wss_id) a
-- where wss.wss_id = a.wss_id
-- ===========================================
CREATE TABLE wss
(
	wss_id serial NOT NULL,
	wss_name varchar(100) NOT NULL,
	dist_id int NOT NULL,
	wss_type varchar(100) NOT NULL,
	status varchar(256),
	geom ,
	PRIMARY KEY (wss_id)
) WITHOUT OIDS;



/* Comments */

COMMENT ON TABLE bookmarks IS 'the table manages the location of bookmark. it requires for leaflet.bookmark plugin.';
COMMENT ON TABLE cell IS 'This table manages boundary of cells in Rwanda. The data requires by NISR.';
COMMENT ON TABLE chamber IS 'This table manages the location of chambers. Chambers should includes following objects;
Washout Chamber,
Valve Chamber,
Starting Chamber,
Collection Chamber,
Air Release Chamber,
PRV Chamber';
COMMENT ON COLUMN chamber.chamber_type IS 'Washout Chamber
Valve Chamber
Starting Chamber
Collection Chamber
Air Release Chamber
PRV Chamber';
COMMENT ON COLUMN chamber.is_breakpressure IS 'true: using for breaking pressure,
false: not using for breaking pressure.';
COMMENT ON TABLE district IS 'This table manages boundary of districts in Rwanda. The data requires by NISR.';
COMMENT ON TABLE feedbacks IS 'This table manages the location of feedbacks from customer. the "contents" column should have contents of feedback as JSON format.';
COMMENT ON COLUMN feedbacks.contents IS 'JSON object format';
COMMENT ON COLUMN feedbacks.geom IS 'geometry(POINT,4326)';
COMMENT ON COLUMN feedbacks.progress IS 'Accepted
Ongoing
Resolved';
COMMENT ON TABLE management IS 'the table manages the relationship between water supply sytem table and private operator table.';
COMMENT ON COLUMN management.start_year IS 'it is the year started the contract between water supply system and private operator.';
COMMENT ON COLUMN management.end_year IS 'If ''end_year'' is null, it means that private operator still be in-charge for the water supply system.
Please enter the year when the contract between private operator and water supply system.';
COMMENT ON TABLE pipeline IS 'This table manages the location of pipeline.';
COMMENT ON TABLE private_operator IS 'this table manages the data of private operator in Rwanda.';
COMMENT ON TABLE province IS 'This table manages boundary of provinces in Rwanda. The data requires by NISR.';
COMMENT ON TABLE pumping_station IS 'This table manages the location of pumping stations.';
COMMENT ON COLUMN pumping_station.water_meter IS 'true: there is water meter,
false: thre is no water meter';
COMMENT ON TABLE reservoir IS 'This table manages the location of reservoirs.';
COMMENT ON COLUMN reservoir.reservoir_type IS 'Ground
Underground
Elevated';
COMMENT ON COLUMN reservoir.water_meter IS 'true: there is water meter,
false: thre is no water meter';
COMMENT ON COLUMN reservoir.is_breakpressure IS 'true: using for breaking pressure,
false: not using for breaking pressure.';
COMMENT ON TABLE sector IS 'This table manages boundary of sectors in Rwanda. The data requires by NISR.';
COMMENT ON TABLE Status IS '0:N/A
1:Full Functional
2:Partially Functional
3:Abandoned';
COMMENT ON TABLE village IS 'This table manages boundary of villages in Rwanda. The data requires by NISR.';
COMMENT ON TABLE waterfacilities IS 'This table manages the location of handpumps and improved springs.';
COMMENT ON COLUMN waterfacilities.wsf_type IS 'Handpump
Improved Spring';
COMMENT ON TABLE watersource IS 'This table manages the location of water sources which is ground water or spring water.';
COMMENT ON COLUMN watersource.source_type IS 'Ground Water
Spring';
COMMENT ON COLUMN watersource.water_meter IS 'true: there is water meter,
false: thre is no water meter';
COMMENT ON TABLE water_connection IS 'This table manages the location of water connections which is water kiosk or public tap.';
COMMENT ON COLUMN water_connection.connection_type IS 'Water Kiosk
Public Tap';
COMMENT ON COLUMN water_connection.water_meter IS 'true: there is water meter,
false: thre is no water meter';
COMMENT ON TABLE wss IS 'This table manages boundary each water supply systems in RWSS. every wss belong to a district id.

The following SQL will update all boundaries from pipeline data.
===========================================
update wss
set geom = a.geom
from(
SELECT wss_id, st_multi(st_buffer(st_union(geom),0.001)) as geom
  FROM pipeline
  group by wss_id) a
where wss.wss_id = a.wss_id
===========================================';



