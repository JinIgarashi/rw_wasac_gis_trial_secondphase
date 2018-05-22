package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet pump object
 * @author Jin Igarashi
 * @version 1.0
 */
public class Pump {
	
	/**
	 * Pump ID
	 */
	public String id;
	
	/**
	 * Node1 ID
	 */
	public String node1;
	
	/**
	 * Node2 ID
	 */
	public String node2;
	
	/**
	 * Longitude. EPSG4326, 6digit
	 */
	public Double lon;
	
	/**
	 * Latitude. EPSG4326, 6digit
	 */
	public Double lat;
	
	/**
	 * Pump curve ID
	 */
	public String parameter;
	
	/**
	 * Pump curve object
	 */
	public PumpCurve curve;
	
	/**
	 * contructor
	 * @param id Pump ID
	 * @param lon Longitude. EPSG4326, 6digit
	 * @param lat Latitude. EPSG4326, 6digit
	 * @param flow flow volume of pump. Unit is LPS
	 * @param head head of pump. Unit is meter.
	 */
	public Pump(String id,Double lon,Double lat, String flow, String head) {
		this.id = "Pump-" + id;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
		this.parameter = "Head " + id;
		this.curve = new PumpCurve(id, flow, head);
	}
	
	/**
	 * Set both side of Node for Pump
	 * @param node1 Node1 ID
	 * @param node2 Node2 ID
	 */
	public void setNode(String node1,String node2) {
		this.node1 = node1;
		this.node2 = node2;
	}
	
	/**
	 * create header text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[PUMPS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Node1", 15),
				Util.padding("Node2", 15),
				Util.padding("Parameters", 10)
				));
	}
	
	/**
	 * add data text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s;\r\n", 
				Util.padding(this.id, 15),
				Util.padding(this.node1, 15),
				Util.padding(this.node2, 15),
				Util.padding(this.parameter, 10)
			));
	}
}
