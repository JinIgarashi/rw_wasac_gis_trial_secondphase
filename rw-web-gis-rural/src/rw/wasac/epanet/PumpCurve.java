package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

public class PumpCurve {
	private String id;
	private String flow;
	private String head;
	
	public PumpCurve(String id,String flow,String head) {
		this.id = id;
		this.flow = flow;
		this.head = head;
	}
	
	public static void create_header(OutputStreamWriter osw) throws IOException {
		osw.write("[CURVES]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("X-Value", 15),
				Util.padding("Y-Value", 15)
				));
	}
	
	public void add(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(this.id, 15),
				Util.padding(this.flow, 15),
				Util.padding(this.head, 15)
			));
	}
}
