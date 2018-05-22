package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet reservoir object
 * @author Jin Igarashi
 * @version 1.0
 */
public class Reservoir {
	
	/**
	 * Reservoir ID
	 */
	public String id;
	
	/**
	 * Elevation. Unit is meter
	 */
	public Integer elevation;
	
	/**
	 * srcType type of water source
	 */
	public String srcType;
	
	/**
	 * time pattern id. default is empty
	 */
	public String pattern;
	
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
	 * @param id Reservoir ID
	 * @param elevation Elevation. Unit is meter
	 * @param srcType type of water source
	 * @param lon Longitude. EPSG4326, 6digits
	 * @param lat Latitude. EPSG4326, 6digits
	 */
	public Reservoir(String id, Integer elevation,String srcType,Double lon,Double lat) {
		this.id = srcType + "-" + id;
		this.elevation = elevation;
		this.pattern = "";
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
	}
	
	/**
	 * create header text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[RESERVOIRS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Head", 10),
				Util.padding("Pattern", 10)
				));
	}
	
	/**
	 * add data text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.elevation), 10),
				Util.padding(String.valueOf(this.pattern), 10)
			));
	}
}
