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

import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;

import rw.wasac.common.ServletListener;
import rw.wasac.geometryOp.Util;

public class PipeList {
	private final Logger logger = LogManager.getLogger(PipeList.class);
	
	private Integer wss_id;
	private CoordinateList coords;
	
	private ArrayList<Pipe> pipes;
	public ArrayList<Pipe> getPipes() {
		return this.pipes;
	}
	
	public PipeList(Integer wss_id, CoordinateList coords) {
		this.wss_id = wss_id;
		this.coords = coords;
	}
	
	public void getData() throws SQLException {
		logger.info("getData start.");
		Connection conn = null;
		try{
			HashMap<String,Coordinate> coordMap = coords.getCoordMap();
			
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT pipe_id, pipe_size, st_astext(st_multi(geom)) as wkt ");
			sql.append(" FROM pipeline ");
			sql.append(" WHERE wss_id=? ");
			
			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setInt(1, wss_id);
			ResultSet rs = pstmt.executeQuery();
			
			this.pipes = new ArrayList<Pipe>();
			while(rs.next()){
				Integer pipe_id = rs.getInt("pipe_id");
				Double pipe_size = rs.getDouble("pipe_size");
				String wkt = rs.getString("wkt");
				MultiLineString multiline = (MultiLineString) Util.createGeometryFromWkt(wkt);
				com.vividsolutions.jts.geom.Coordinate[] array = multiline.getCoordinates();
				for (int i = 0, j = 1 ; j < array.length; i++, j++) {
					Double x1 = rw.wasac.epanet.Util.setScale(array[i].x,6);
					Double y1 = rw.wasac.epanet.Util.setScale(array[i].y,6);
					String[] key1_ary = {x1.toString(),y1.toString()};
					String key1 = String.join(",",key1_ary);
					
					if (coordMap.containsKey(key1)) {
						Coordinate coord1 = coordMap.get(key1);
						
						Double x2 = rw.wasac.epanet.Util.setScale(array[j].x,6);
						Double y2 = rw.wasac.epanet.Util.setScale(array[j].y,6);
						String[] key2_ary = {x2.toString(),y2.toString()};
						String key2 = String.join(",",key2_ary);
						
						if (coordMap.containsKey(key2)) {
							Coordinate coord2 = coordMap.get(key2);
							String _wkt = String.format("LineString(%s %s,%s %s)", 
									coord1.lon_utm, coord1.lat_utm, coord2.lon_utm, coord2.lat_utm);
							LineString line = (LineString) Util.createGeometryFromWkt(_wkt);
							
							String node1 = coord1.id;
							String node2 = coord2.id;
							Double length = line.getLength();
							String _id = String.format("%s-%s", pipe_id,i);
							Pipe pipe = new Pipe(_id,node1,node2,length,pipe_size);
							this.pipes.add(pipe);
						}
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
	
	public void export_pipes(OutputStreamWriter osw) throws IOException {
		Pipe.create_header_pipes(osw);
	    for (Pipe pipe:this.getPipes()) {
	    	pipe.add_pipes(osw);
	    }
	    osw.write("\r\n");
	}
}
