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

public class PumpList {
	private final Logger logger = LogManager.getLogger(PumpList.class);
	
	private Integer wss_id;
	private CoordinateList coords;
	private PipeList pipes;
	
	private ArrayList<Pump> pumps;
	public ArrayList<Pump> getPumps(){
		return this.pumps;
	}
	
	public PumpList(Integer wss_id, CoordinateList coords,PipeList pipes) {
		this.wss_id = wss_id;
		this.coords = coords;
		this.pipes = pipes;
	}
	
	public void getData() throws SQLException {
		logger.info("getData start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT pumpingstation_id as id, st_x(geom) as lon, st_y(geom) as lat ");
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
				
				Pump pump = new Pump(id,lon,lat);
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
	
	public void export_pumps(OutputStreamWriter osw) throws IOException {
		Pump.create_header_pump(osw);
	    for (Pump p: this.getPumps()) {
	    	p.add_tank(osw);
	    }
	    osw.write("\r\n");
	}
	
}
