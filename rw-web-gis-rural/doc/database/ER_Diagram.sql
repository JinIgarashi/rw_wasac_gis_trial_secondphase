
/* Drop Tables */

DROP TABLE IF EXISTS break_pressure;
DROP TABLE IF EXISTS village;
DROP TABLE IF EXISTS cell;
DROP TABLE IF EXISTS chamber;
DROP TABLE IF EXISTS sector;
DROP TABLE IF EXISTS wss;
DROP TABLE IF EXISTS district;
DROP TABLE IF EXISTS pipeline;
DROP TABLE IF EXISTS province;
DROP TABLE IF EXISTS pumping_station;
DROP TABLE IF EXISTS reservoir;
DROP TABLE IF EXISTS watersource;
DROP TABLE IF EXISTS water_connection;




/* Create Tables */

CREATE TABLE break_pressure
(
	breakpressure_id serial NOT NULL,
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year int,
	material varchar(50),
	chamber_size int[][][],
	status int,
	-- chamber, valve
	method_of_breakpressure varchar(50),
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (breakpressure_id)
) WITHOUT OIDS;


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


CREATE TABLE chamber
(
	chamber_id serial NOT NULL,
	-- Washout Chamber
	-- Valve Chamber
	-- Starting Chamber
	-- Collection Chamber
	-- Air Release Chamber
	chamber_type varchar(50) NOT NULL,
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year int,
	chamber_size int[][][],
	material varchar(50),
	water_meter boolean DEFAULT '0' NOT NULL,
	status int,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (chamber_id)
) WITHOUT OIDS;


CREATE TABLE district
(
	dist_id int NOT NULL,
	district varchar(50) NOT NULL,
	prov_id int NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (dist_id)
) WITHOUT OIDS;


CREATE TABLE pipeline
(
	pipe_id serial NOT NULL,
	dist_id int NOT NULL,
	wss_id int,
	material varchar(50),
	pipe_size double precision,
	pn int,
	constructed_year int,
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	remarks varchar(200),
	PRIMARY KEY (pipe_id)
) WITHOUT OIDS;


CREATE TABLE province
(
	prov_id int NOT NULL,
	prov_name varchar(50) NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (prov_id)
) WITHOUT OIDS;


CREATE TABLE pumping_station
(
	pumpingstation_id serial NOT NULL,
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year int,
	water_meter boolean DEFAULT '0' NOT NULL,
	status int,
	-- Example:
	-- H:167m, Q:37m3/h, P:25,5kW
	specification varchar(100),
	pump_type varchar(50),
	power_source varchar(50),
	no_pump int,
	kva double precision,
	no_generator int DEFAULT 0,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (pumpingstation_id)
) WITHOUT OIDS;


CREATE TABLE reservoir
(
	reservoir_id serial NOT NULL,
	-- Ground
	-- Underground
	-- Elevated
	reservoir_type varchar(50),
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year int,
	capacity int,
	material varchar(50),
	water_meter boolean DEFAULT '0' NOT NULL,
	status int,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (reservoir_id)
) WITHOUT OIDS;


CREATE TABLE sector
(
	sect_id int NOT NULL,
	sector varchar(50) NOT NULL,
	prov_id int NOT NULL,
	dist_id int NOT NULL,
	geom  NOT NULL,
	PRIMARY KEY (sect_id)
) WITHOUT OIDS;


CREATE TABLE village
(
	vill_id int NOT NULL,
	village varchar(50) NOT NULL,
	prov_id int NOT NULL,
	dist_id int NOT NULL,
	sect_id int NOT NULL,
	cell_id int NOT NULL,
	PRIMARY KEY (vill_id)
) WITHOUT OIDS;


CREATE TABLE watersource
(
	watersource_id serial NOT NULL,
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	source_type varchar(50),
	discharge double precision,
	constructed_year int,
	rehabilitated_year int,
	water_meter boolean DEFAULT '0' NOT NULL,
	status int,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	PRIMARY KEY (watersource_id)
) WITHOUT OIDS;


CREATE TABLE water_connection
(
	connection_id serial NOT NULL,
	dist_id int NOT NULL,
	sect_id int,
	cell_id int,
	vill_id int,
	wss_id int NOT NULL,
	constructed_year int,
	rehabilitated_year int,
	material varchar(50),
	no_user int,
	water_meter boolean DEFAULT '0' NOT NULL,
	status int,
	observation varchar(200),
	input_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	geom  NOT NULL,
	elevation int,
	is_waterkiosk boolean DEFAULT '0' NOT NULL,
	is_publictap boolean DEFAULT '0' NOT NULL,
	PRIMARY KEY (connection_id)
) WITHOUT OIDS;


CREATE TABLE wss
(
	wss_id serial NOT NULL,
	wss_name varchar(100) NOT NULL,
	dist_id int NOT NULL,
	PRIMARY KEY (wss_id)
) WITHOUT OIDS;



/* Comments */

COMMENT ON COLUMN break_pressure.method_of_breakpressure IS 'chamber, valve';
COMMENT ON COLUMN chamber.chamber_type IS 'Washout Chamber
Valve Chamber
Starting Chamber
Collection Chamber
Air Release Chamber';
COMMENT ON COLUMN pumping_station.specification IS 'Example:
H:167m, Q:37m3/h, P:25,5kW';
COMMENT ON COLUMN reservoir.reservoir_type IS 'Ground
Underground
Elevated';



