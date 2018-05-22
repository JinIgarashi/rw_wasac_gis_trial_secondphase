package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet pump curve information
 * @author Jin Igarashi
 * @version 1.0
 */
public class PumpCurve {
	
	/**
	 * Pump curve ID
	 */
	private String id;
	
	/**
	 * flow volume of pump. Unit is LPS
	 */
	private String flow;
	
	/**
	 * head of pump. Unit is meter.
	 */
	private String head;
	
	
	/**
	 * Constructor
	 * @param id Pump curve ID
	 * @param flow flow volume of pump. Unit is LPS
	 * @param head head of pump. Unit is meter.
	 */
	public PumpCurve(String id,String flow,String head) {
		this.id = id;
		this.flow = flow;
		this.head = head;
	}
	
	/**
	 * create header text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[CURVES]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("X-Value", 15),
				Util.padding("Y-Value", 15)
				));
	}
	
	/**
	 * add data text
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(this.id, 15),
				Util.padding(this.flow, 15),
				Util.padding(this.head, 15)
			));
	}
}
