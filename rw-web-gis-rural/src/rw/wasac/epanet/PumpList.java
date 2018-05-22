package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * Managing for list of epanet pump object
 * @author Jin Igarashi
 * @version 1.0
 */
public class PumpList {
	private final Logger logger = LogManager.getLogger(PumpList.class);
	
	/**
	 * WSS ID
	 */
	private Integer wss_id;
	
	/**
	 * CoordinateList class object
	 */
	private CoordinateList coords;
	
	/**
	 * List of Pipe objects
	 */
	private PipeList pipes;
	
	/**
	 * List of Pump objects
	 */
	private ArrayList<Pump> pumps;
	
	/**
	 * Returning List of Pump objects
	 * @return List of Pump objects
	 */
	public ArrayList<Pump> getPumps(){
		return this.pumps;
	}
	
	/**
	 * Constructor
	 * @param wss_id WSS ID
	 * @param coords CoodinateList object
	 * @param pipes PipeList object
	 */
	public PumpList(Integer wss_id, CoordinateList coords,PipeList pipes) {
		this.wss_id = wss_id;
		this.coords = coords;
		this.pipes = pipes;
	}
	
	/**
	 * Getting data from GIS database.
	 * @throws SQLException SQL Exception
	 */
	public void getData() throws SQLException {
		logger.info("getData start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT pumpingstation_id as id, st_x(geom) as lon, st_y(geom) as lat, head_pump, discharge_pump ");
			sql.append(" FROM pumping_station ");
			sql.append(" WHERE wss_id=? ");	
			
			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setInt(1, this.wss_id);
			ResultSet rs = pstmt.executeQuery();
			this.pumps = new ArrayList<Pump>();
			
			ArrayList<Pipe> pipeList = this.pipes.getPipes();
			while(rs.next()){
				String id = String.valueOf(rs.getInt("id"));
				Double lon = rs.getDouble("lon");
				Double lat = rs.getDouble("lat");
				String head = rs.getString("head_pump");
				String discharge = rs.getString("discharge_pump");
				
				Pump pump = new Pump(id,lon,lat,discharge,head);
				this.pumps.add(pump);
				
				String[] target_latlng = {pump.lon.toString(),pump.lat.toString()};
				String target_key = String.join(",",target_latlng);
				
				HashMap<String,Coordinate> coordMap = this.coords.getCoordMap();
				if (coordMap.containsKey(target_key)) {
					Coordinate coord = coordMap.get(target_key);
					String nodeid = coord.id;
					
					int del_pipe_idx = -1;
					for (Pipe p:pipeList) {
						if (nodeid.equals(p.node1) || nodeid.equals(p.node2)) {
							pump.setNode(p.node1, p.node2);
							del_pipe_idx = pipeList.indexOf(p);
						}
					}
					if (del_pipe_idx > -1) {
						pipeList.remove(del_pipe_idx);
					}
				}
			}
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			throw new WebApplicationException(e, Status.INTERNAL_SERVER_ERROR);
		}finally{
			if (conn != null){
				conn.close();
				conn = null;
			}
		}
	}
	
	/**
	 * Exporting list of data into inp file
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void export(OutputStreamWriter osw) throws IOException {
		Pump.create_header(osw);
	    for (Pump p: this.getPumps()) {
	    	p.add(osw);
	    }
	    osw.write("\r\n");
	    
	    PumpCurve.create_header(osw);
	    for (Pump p: this.getPumps()) {
	    	p.curve.add(osw);
	    }
	    osw.write("\r\n");
	}
	
}
