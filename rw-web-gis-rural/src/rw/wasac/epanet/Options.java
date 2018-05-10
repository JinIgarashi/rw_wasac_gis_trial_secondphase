package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.HashMap;

public class Options {
	public HashMap<String, String> options;
	
	public Options(){
		options = new HashMap<String, String>();
		options.put("Units", "LPS");
		options.put("Headloss", "H-W");
		options.put("Specific Gravity", "1");
		options.put("Viscosity", "1");
		options.put("Trials", "40");
		options.put("Accuracy", "0.001");
		options.put("CHECKFREQ", "2");
		options.put("MAXCHECK", "10");
		options.put("DAMPLIMIT", "0");
		options.put("Unbalanced", "Continue 10");
		options.put("Pattern", "0");
		options.put("Demand Multiplier", "1.0");
		options.put("Emitter Exponent", "0.5");
		options.put("Quality", "None mg/L");
		options.put("Diffusivity", "1");
		options.put("Tolerance", "0.01");
	}
	
	public void export(OutputStreamWriter osw) throws IOException {
		osw.write("[OPTIONS]\r\n");
		for (String key : this.options.keySet()) {
			String val = this.options.get(key);
			osw.write(String.format(" %s\t%s\r\n",
					Util.padding(key, 20),
					Util.padding(val, 15)
					));
		}
		osw.write("\r\n");
	}
}
