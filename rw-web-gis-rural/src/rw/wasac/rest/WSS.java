package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * WSS
 * @version 1.00
 * @author Igarashi
 */
@Path("/WSS")
public class WSS {
	private final Logger logger = LogManager.getLogger(WSS.class);
	
	/**
	 * To get list of centroid of WSSs' boundary in Rwanda
	 * @return list of centroid of WSSs' boundary
	 * @throws SQLException SQL error
	 */
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
			sql.append("  w.wss_id, ");
			sql.append("  w.wss_name,");
			sql.append("  w.dist_id, ");
			sql.append("  CASE WHEN m.po_id is null THEN -1 else m.po_id END as po_id,");
			sql.append("  st_ymin(st_extent(w.geom)) as ymin, ");
			sql.append("  st_xmin(st_extent(w.geom)) as xmin, ");
			sql.append("  st_ymax(st_extent(w.geom)) as ymax, ");
			sql.append("  st_xmax(st_extent(w.geom)) as xmax ");
			sql.append("FROM  wss w ");
			sql.append("LEFT JOIN management m ");
			sql.append("ON w.wss_id = m.wss_id ");
			//sql.append("AND m.end_year is null ");
			sql.append("WHERE w.geom is not null ");
			sql.append("GROUP BY ");
			sql.append("   w.wss_id, ");
			sql.append("   m.po_id ");
			sql.append("ORDER BY ");
			sql.append("   w.wss_id ");
			
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			ResultSet rs = pstmt.executeQuery();
			ResultSetMetaData rsmd= rs.getMetaData();
			ArrayList<HashMap<String,Object>> res = new ArrayList<HashMap<String,Object>>();
			while(rs.next()){
				HashMap<String,Object> data = new HashMap<String,Object>();
				for (int i = 1; i <= rsmd.getColumnCount(); i++) {
					String colname = rsmd.getColumnName(i);
					data.put(colname, rs.getObject(colname));
				}
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
