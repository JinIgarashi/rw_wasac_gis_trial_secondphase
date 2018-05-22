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
 * Managing for list of epanet Coordinate and Junction object
 * @author Jin Igarashi
 * @version 1.0
 */
public class CoordinateList {
	private final Logger logger = LogManager.getLogger(CoordinateList.class);
	
	/**
	 * WSS ID
	 */
	private Integer wss_id;
	
	/**
	 * HashMap for Coodinate object.<br>
	 * KEY: Longitude,Latitude
	 * VALUE: Coordinate class object
	 */
	private HashMap<String,Coordinate> coordMap;
	
	/**
	 * Returning hashMap for cooridnate objects
	 * @return KEY: Longitude,Latitude VALUE: Coordinate class object
	 */
	public HashMap<String,Coordinate> getCoordMap() {
		return this.coordMap;
	}
	
	/**
	 * Constructor
	 * @param wss_id WSS ID
	 */
	public CoordinateList(Integer wss_id) {
		this.wss_id = wss_id;
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
			sql.append(" WITH points2d AS ");
			sql.append("     (SELECT (ST_DumpPoints(geom)).geom AS geom FROM pipeline where wss_id=?), ");
			sql.append("   cells AS ");
			sql.append("     (SELECT p.geom AS geom, ST_Value(a.rast, 1, p.geom) AS val ");
			sql.append("      FROM rwanda_dem_10m a, points2d p ");
			sql.append("      WHERE ST_Intersects(a.rast, p.geom)), ");
			sql.append("   points3d AS ");
			sql.append("     (SELECT ST_SetSRID(ST_MakePoint(ST_X(geom), ST_Y(geom), val), " + Util.epsg + ") AS geom FROM cells) ");
			sql.append(" SELECT row_number() over() as id,st_x(geom) as lon, st_y(geom) as lat, st_z(geom)as alt, ");
			sql.append(" st_x(st_transform(geom," + Util.epsg_utm + ")) as lon_utm, st_y(st_transform(geom," + Util.epsg_utm + ")) as lat_utm ");
			sql.append(" FROM points3d ");
			
			
			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setInt(1, this.wss_id);
			ResultSet rs = pstmt.executeQuery();
			this.coordMap = new HashMap<String,Coordinate>();
			while(rs.next()){
				String id = String.valueOf(rs.getInt("id"));
				Double lon = rs.getDouble("lon");
				Double lat = rs.getDouble("lat");
				Integer alt = rs.getInt("alt");
				Double lon_utm = rs.getDouble("lon_utm");
				Double lat_utm = rs.getDouble("lat_utm");
				Coordinate coord = new Coordinate("Node-" + id,lon,lat,alt, lon_utm, lat_utm);
				String[] key = {coord.lon.toString(),coord.lat.toString()};
				this.coordMap.put(String.join(",",key),coord);
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
	 * add coordinate object into hashmap.
	 * @param val Coordinate object
	 */
	public void add_coordinate(Coordinate val) {
		String[] target_latlng = {val.lon.toString(),val.lat.toString()};
		String target_key = String.join(",",target_latlng);
		ArrayList<String> del_key = new ArrayList<String>();
		for (String key: this.coordMap.keySet()) {
			if (key.equals(target_key)) {
				//既にノードとして登録されていたらIDを書き換え
				del_key.add(target_key);
				break;
			}
	    }
		for (String key:del_key) {
			this.coordMap.remove(key);
		}
		//未登録だったら追加
		this.coordMap.put(target_key,val);
	}
	
	/**
	 * Exporting list of JUNCTIONS into inp file
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void export_junctions(OutputStreamWriter osw) throws IOException {
		Coordinate.create_header_junction(osw);
	    for (Coordinate coord: this.getCoordMap().values()) {
	    	if (!coord.id.contains("Node")) {
	    		//ノード以外のデータはスルー
	    		continue;
	    	}
	    	coord.add_junction(osw);
	    }
	    osw.write("\r\n");
	}
	
	/**
	 * Exporting list of COORDINATES into inp file
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void export_coordinates(OutputStreamWriter osw) throws IOException {
		Coordinate.create_header_coordinates(osw);
	    for (Coordinate coord: this.getCoordMap().values()) {
	    	coord.add_coordinate(osw);
	    }
	    osw.write("\r\n");
	}
}
