package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class Reservoir {
	public String id;
	public Integer elevation;
	public String srcType;
	public String pattern;
	public Double lon;
	public Double lat;
	
	public Reservoir(String id, Integer elevation,String srcType,Double lon,Double lat) {
		this.id = srcType + "-" + id;
		this.elevation = elevation;
		this.pattern = "";
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
	}
	
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[RESERVOIRS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Head", 10),
				Util.padding("Pattern", 10)
				));
	}
	
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.elevation), 10),
				Util.padding(String.valueOf(this.pattern), 10)
			));
	}
}
