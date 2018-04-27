package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class Pump {
	public String id;
	public String node1;
	public String node2;
	public Double lon;
	public Double lat;
	public String parameter;
	
	public Pump(String id,Double lon,Double lat) {
		this.id = "Pump-" + id;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
		this.parameter = "";
	}
	
	public void setNode(String node1,String node2) {
		this.node1 = node1;
		this.node2 = node2;
	}
	
	public static void create_header_pump(OutputStreamWriter osw) throws IOException {
		osw.write("[PUMPS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Node1", 15),
				Util.padding("Node2", 15),
				Util.padding("Parameters", 10)
				));
	}
	
	public void add_tank(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s;\r\n", 
				Util.padding(this.id, 15),
				Util.padding(this.node1, 15),
				Util.padding(this.node2, 15),
				Util.padding(this.parameter, 10)
			));
	}
}
