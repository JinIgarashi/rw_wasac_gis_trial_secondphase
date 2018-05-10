package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class Pipe {
	public String id;
	public String node1;
	public String node2;
	public Double length;
	public Double diameter;
	public Integer roughness;
	public Integer minorloss;
	public String status;
	
	public Pipe(String id, String node1, String node2, Double length, Double diameter) {
		this.id = "Pipe-" + id;
		this.node1 = node1;
		this.node2 = node2;
		this.length = Util.setScale(length, 3);
		this.diameter = diameter;
		this.roughness = 100;
		this.minorloss = 0;
		this.status = "Open";
	}
	
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[PIPES]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Node1", 15),
				Util.padding("Node2", 15),
				Util.padding("Length", 10),
				Util.padding("Diameter", 10),
				Util.padding("Roughness", 10),
				Util.padding("MinorLoss", 10),
				Util.padding("Status", 15)
			));
	}
	
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s\t%s\t%s\t%s\t%s;\r\n", 
				Util.padding(this.id, 15),
				Util.padding(String.valueOf(this.node1), 15),
				Util.padding(String.valueOf(this.node2), 15),
				Util.padding(String.valueOf(this.length), 10),
				Util.padding(String.valueOf(this.diameter), 10),
				Util.padding(String.valueOf(this.roughness), 10),
				Util.padding(String.valueOf(this.minorloss), 10),
				Util.padding(this.status, 15)
			));
	}
}
