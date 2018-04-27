package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class Tank {
	public String id;
	public Integer elevation;
	public Integer capacity;
	public Double lon;
	public Double lat;
	
	public Tank(String id, Integer elevation,Integer capacity,Double lon,Double lat) {
		this.id = "Tank-" + id;
		this.elevation = elevation;
		this.capacity = capacity;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
	}
	
	public static void create_header_tank(OutputStreamWriter osw) throws IOException {
		osw.write("[TANKS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Elevation", 10),
				Util.padding("InitLevel", 10),
				Util.padding("MinLevel", 10),
				Util.padding("MaxLevel", 10)
				));
	}
	
	public void add_tank(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.elevation), 10),
				Util.padding(String.valueOf(this.capacity*0.5), 10),
				Util.padding(String.valueOf(this.capacity*0.1), 10),
				Util.padding(String.valueOf(this.capacity), 10)
			));
	}
}
