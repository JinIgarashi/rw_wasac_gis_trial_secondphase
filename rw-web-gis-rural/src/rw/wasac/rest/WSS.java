package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * WSS
 * @version 1.00
 * @author Igarashi
 */
@Path("/WSS")
public class WSS {
	private final Logger logger = Logger.getLogger(WSS.class);

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public RestResult<ArrayList<HashMap<String,Object>>> get() throws SQLException {

		logger.info("get start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append("SELECT ");
			sql.append("  a.wss_id, ");
			sql.append("  a.wss_name,");
			sql.append("  a.dist_id, ");
			sql.append("  b.district, ");
			sql.append("  st_y(a.geom) as lat, ");
			sql.append("  st_x(a.geom) as lng ");
			sql.append("FROM  wss a ");
			sql.append("INNER JOIN district b ");
			sql.append("ON a.dist_id = b.dist_id ");
			sql.append("WHERE a.geom is not null ");
			sql.append("ORDER BY ");
			sql.append("   wss_id ");
			
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			ResultSet rs = pstmt.executeQuery();
			ArrayList<HashMap<String,Object>> res = new ArrayList<HashMap<String,Object>>();
			while(rs.next()){
				HashMap<String,Object> data = new HashMap<String,Object>();
				data.put("id", rs.getInt("wss_id"));
				data.put("name", rs.getString("wss_name"));
				data.put("district", rs.getString("district"));
				data.put("lat", rs.getDouble("lat"));
				data.put("lng", rs.getDouble("lng"));
				res.add(data);
			}

			return new RestResult<ArrayList<HashMap<String,Object>>>(res);
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
