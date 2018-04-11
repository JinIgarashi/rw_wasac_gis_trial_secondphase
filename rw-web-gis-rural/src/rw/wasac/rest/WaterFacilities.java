package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Objects;

import javax.ws.rs.GET;
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
@Path("/WaterFacilities")
public class WaterFacilities {
	private final Logger logger = LogManager.getLogger(WaterFacilities.class);

	/**
	 * To get Hand Pumps Data as geojson format in Rwanda
	 * @param dist_id optional. Use dist_id which you want to get from district table.
	 * @return geojson
	 * @throws SQLException SQL error
	 */
	@Path("/Handpumps")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String get_handpumps(
			@QueryParam("dist_id") Integer dist_id
			) throws SQLException {
		return this.get_wsf_data("Hand Pump", dist_id);
	}
	
	/**
	 * To get Improved Springs Data as geojson format in Rwanda
	 * @param dist_id optional. Use dist_id which you want to get from district table.
	 * @return geojson
	 * @throws SQLException SQL error
	 */
	@Path("/ImprovedSprings")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String get_improvedsprings(
			@QueryParam("dist_id") Integer dist_id
			) throws SQLException {
		return this.get_wsf_data("Improved Spring", dist_id);
	}
	
	
	/**
	 *  To get data of water facilities as geojson format in Rwanda
	 * @param wsftype required. 'Hand Pump' or 'Improved Spring'
	 * @param dist_id optional. Use dist_id which you want to get from district table.
	 * @return geojson
	 * @throws SQLException SQL error
	 */
	public String get_wsf_data(String wsftype, Integer dist_id) throws SQLException {

		logger.info("get start.");
		logger.info("wsftype:" + wsftype);
		logger.info("dist_id:" + dist_id);
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT json_build_object( ");
			sql.append("     'type', 'FeatureCollection', ");
			sql.append("     'crs',  json_build_object( ");
			sql.append("         'type',      'name',  ");
			sql.append("         'properties', json_build_object( ");
			sql.append("             'name', 'EPSG:4326'   ");
			sql.append("         ) ");
			sql.append("     ),  ");
			sql.append("     'features', json_agg( ");
			sql.append("         json_build_object( ");
			sql.append("             'type',       'Feature', ");
			sql.append("             'id',         x.id, ");
			sql.append("             'geometry',   ST_AsGeoJSON(x.geom)::json, ");
			sql.append("             'properties', json_build_object( ");
			sql.append("               'WSF Code', x.wsf_code, ");
			sql.append("               'WSF Type', x.wsf_type, ");
			sql.append("               'WSF Name', x.wsf_name, ");
			sql.append("               'Altitue', x.altitude, ");
			sql.append("               'Villaged Served', x.serv_area_villages, ");
			sql.append("               'Population Served', x.serv_popu_personals, ");
			sql.append("               'Households Served', x.serv_popu_households, ");
			sql.append("               'Type of Water Source', x.type_water_source, ");
			sql.append("               'No of Water Sources', x.no_water_source, ");
			sql.append("               'Type of Hand Pump', x.hand_pump_type_name, ");
			sql.append("               'Contructed Year', x.year_construction, ");
			sql.append("               'Fund', x.fund, ");
			sql.append("               'Status', y.status, ");
			sql.append("               'Observation', x.observation ");
			sql.append("             ) ");
			sql.append("         ) ");
			sql.append("     ) ");
			sql.append(" )as geojson ");
			sql.append(" FROM waterfacilities x ");
			sql.append(" INNER JOIN status y ");
			sql.append(" ON x.status = y.code ");
			sql.append(" INNER JOIN district z ");
			sql.append(" ON st_intersects(z.geom, x.geom) ");
			sql.append(" WHERE x.wsf_type = ? ");
			if (!Objects.isNull(dist_id)) {
				sql.append(" AND z.dist_id = ? ");
			}
			logger.info(sql.toString());
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, wsftype);
			if (!Objects.isNull(dist_id)) {
				pstmt.setInt(2, dist_id);
			}
			
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
