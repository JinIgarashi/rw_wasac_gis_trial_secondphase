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

import org.apache.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * Provinces
 * @version 1.00
 * @author Igarashi
 */
@Path("/Provinces")
public class Provinces {
	private final Logger logger = Logger.getLogger(Provinces.class);

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
			sql.append("  p.prov_id, ");
			sql.append("  p.prov_name, ");
			sql.append("  st_ymin(st_extent(p.geom)) as ymin, ");
			sql.append("  st_xmin(st_extent(p.geom)) as xmin, ");
			sql.append("  st_ymax(st_extent(p.geom)) as ymax, ");
			sql.append("  st_xmax(st_extent(p.geom)) as xmax ");
			sql.append("FROM  province p ");
			sql.append("GROUP BY p.prov_id ");
			sql.append("ORDER BY  p.prov_id");

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
