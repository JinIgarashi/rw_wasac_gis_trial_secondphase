package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class Coordinate {
	public String id;
	public Double lon;
	public Double lat;
	public Integer altitude;
	public Double lon_utm;
	public Double lat_utm;
	public Integer demand;
	public Integer pattern;
	
	public Coordinate(String id,Double lon,Double lat, Integer altitude,Double lon_utm, Double lat_utm) {
		this.id = id;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
		this.altitude = altitude;
		this.lon_utm = Util.setScale(lon_utm,3);
		this.lat_utm = Util.setScale(lat_utm,3);
		this.demand = 0;
		this.pattern = 0;
	}
	
	public static void create_header_junction(OutputStreamWriter osw) throws IOException {
		osw.write("[JUNCTIONS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Elev", 10),
				Util.padding("Demand", 10),
				Util.padding("Pattern", 10)
				));
	}
	
	public void add_junction(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.altitude), 10),
				Util.padding(String.valueOf(this.demand), 10),
				Util.padding(String.valueOf(this.pattern), 10)
			));
	}
	
	public static void create_header_coordinates(OutputStreamWriter osw) throws IOException {
		osw.write("[COORDINATES]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("Node", 15),
				Util.padding("X-Coord", 10),
				Util.padding("Y-Coord", 10)
				));
	}
	
	public void add_coordinate(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.lon), 10),
				Util.padding(String.valueOf(this.lat), 10)
			));
	}
}
