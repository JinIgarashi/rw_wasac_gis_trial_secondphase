package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Objects;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * WaterFacilities
 * @version 1.00
 * @author Igarashi
 */
@Path("/Elevation")
public class Elevation {
	private final Logger logger = LogManager.getLogger(Elevation.class);
	
	/**
	 *  To get data of linestring with elevation as geojson format
	 * @param wktline required. Give LineString data as WKT format.EPSG should be 4326.
	 * @return GeoJSON format.LineString with Elevation.
	 * @throws SQLException SQL error
	 */
	@Path("/LineString")
	@PUT
	@Produces(MediaType.TEXT_PLAIN)
	public String get_line_with_elevation(@FormParam("wkt") String wktline) throws SQLException {

		logger.info("get start.");
		logger.info("wktline:" + wktline);
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" WITH line AS ");
			sql.append("     (SELECT 'SRID=4326;" + wktline + "'::geometry AS geom), ");
			sql.append("   points2d AS ");
			sql.append("     (SELECT (ST_DumpPoints(geom)).geom AS geom FROM line), ");
			sql.append("   cells AS ");
			sql.append("     (SELECT p.geom AS geom, ST_Value(a.rast, 1, p.geom) AS val ");
			sql.append("      FROM rwanda_dem_10m a, points2d p ");
			sql.append("      WHERE ST_Intersects(a.rast, p.geom)), ");
			sql.append("   points3d AS ");
			sql.append("     (SELECT ST_SetSRID(ST_MakePoint(ST_X(geom), ST_Y(geom), val), 4326) AS geom FROM cells) ");
			sql.append(" SELECT ST_AsGeoJSON(ST_MakeLine(geom)) as geojson FROM points3d;");

			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			ResultSet rs = pstmt.executeQuery();
			rs.next();
			String res = rs.getString("geojson");
			
			return res;
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

}
