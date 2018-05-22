package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet pipe object
 * @author Jin Igarashi
 * @version 1.0
 */
public class Pipe {
	/**
	 * Pipe ID
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
	 * Length of Pipe. Unit is meter
	 */
	public Double length;
	
	/**
	 * Diameter of Pipe. Unit is mm
	 */
	public Double diameter;
	
	/**
	 * Roughness of Pipe. Default is 100
	 */
	public Integer roughness;
	
	/**
	 * Minorloss of Pipe. Default is 0
	 */
	public Integer minorloss;
	
	/**
	 * Status of Pipe. Default is Open.
	 */
	public String status;
	
	/**
	 * Contructor
	 * @param id Pipe ID
	 * @param node1 Node1 ID
	 * @param node2 Node2 ID
	 * @param length Length of Pipe. Unit is meter
	 * @param diameter Diameter of Pipe. Unit is mm
	 */
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
	
	/**
	 * create header text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
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
	
	/**
	 * add data text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
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
