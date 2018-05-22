package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet tank object
 * @author Jin Igarashi
 * @version 1.0
 */
public class Tank {
	
	/**
	 * Tank ID
	 */
	public String id;
	
	/**
	 * Elevation. Unit is meter
	 */
	public Integer elevation;
	
	/**
	 * volume of tank. Unit is m3.
	 */
	public Integer capacity;
	
	/**
	 * Longitude. EPSG4326, 6digits
	 */
	public Double lon;
	
	/**
	 * Latitude. EPSG4326, 6digits
	 */
	public Double lat;
	
	/**
	 * Constructor
	 * @param id Tank ID
	 * @param elevation Elevation. Unit is meter
	 * @param capacity volume of tank. Unit is m3.
	 * @param lon Longitude. EPSG4326, 6digits
	 * @param lat Latitude. EPSG4326, 6digits
	 */
	public Tank(String id, Integer elevation,Integer capacity,Double lon,Double lat) {
		this.id = "Tank-" + id;
		this.elevation = elevation;
		this.capacity = capacity;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
	}
	
	/**
	 * create header text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[TANKS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Elevation", 10),
				Util.padding("InitLevel", 10),
				Util.padding("MinLevel", 10),
				Util.padding("MaxLevel", 10)
				));
	}
	
	/**
	 * add data text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.elevation), 10),
				Util.padding(String.valueOf(this.capacity*0.5), 10),
				Util.padding(String.valueOf(this.capacity*0.1), 10),
				Util.padding(String.valueOf(this.capacity), 10)
			));
	}
}
