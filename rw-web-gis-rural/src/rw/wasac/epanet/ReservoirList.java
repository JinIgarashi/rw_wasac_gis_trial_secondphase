package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.common.ServletListener;

public class ReservoirList {
	private final Logger logger = LogManager.getLogger(ReservoirList.class);
	
	private Integer wss_id;
	private CoordinateList coords;
	
	private ArrayList<Reservoir> reservoirs;
	public ArrayList<Reservoir> getReservoirs(){
		return this.reservoirs;
	}
	
	public ReservoirList(Integer wss_id, CoordinateList coords) {
		this.wss_id = wss_id;
		this.coords = coords;
	}
	
	public void getData() throws SQLException {
		logger.info("getData start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT watersource_id as id, elevation, source_type, st_x(geom) as lon, st_y(geom) as lat, ");
			sql.append(" st_x(st_transform(geom," + Util.epsg_utm + ")) as lon_utm, st_y(st_transform(geom," + Util.epsg_utm + ")) as lat_utm  ");
			sql.append(" FROM watersource ");
			sql.append(" WHERE wss_id=? ");	
			
			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setInt(1, this.wss_id);
			ResultSet rs = pstmt.executeQuery();
			this.reservoirs = new ArrayList<Reservoir>();
			while(rs.next()){
				String id = String.valueOf(rs.getInt("id"));
				Double lon = rs.getDouble("lon");
				Double lat = rs.getDouble("lat");
				Integer elevation = rs.getInt("elevation");
				String srctype = rs.getString("source_type");
				Double lon_utm = rs.getDouble("lon_utm");
				Double lat_utm = rs.getDouble("lat_utm");
				Reservoir reservoir = new Reservoir(id,elevation,srctype,lon,lat);
				this.reservoirs.add(reservoir);
				
				Coordinate coord = new Coordinate(reservoir.id,reservoir.lon,reservoir.lat,reservoir.elevation,lon_utm,lat_utm);
				coords.add_coordinate(coord);
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
	
	public void export(OutputStreamWriter osw) throws IOException {
		Reservoir.create_header(osw);
	    for (Reservoir r: this.getReservoirs()) {
	    	r.add(osw);
	    }
	    osw.write("\r\n");
	}
	
}
