package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import net.arnx.jsonic.JSON;
import rw.wasac.common.ServletListener;

/**
 * Feedbacks
 * @version 1.00
 * @author Igarashi
 */
@Path("/Feedbacks")
public class Feedbacks {
	private final Logger logger = LogManager.getLogger(Feedbacks.class);
	
	@POST
	@Consumes("application/x-www-form-urlencoded;charset=UTF-8")
	public void post(
			@FormParam("location") String location,
			@FormParam("contents") String contents
			) throws SQLException {

		logger.info("post start.");
		logger.info("location:" + location);
		logger.info("contents:" + contents);
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			String geom = "st_geomfromtext('" + location +"',4326)";
			sql.append(" INSERT INTO public.feedbacks(contents, progress, geom)VALUES (?, ?, " + geom + ") ");
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, contents);
			pstmt.setString(2, "Accepted");
			pstmt.execute();
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
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public RestResult<ArrayList<HashMap<String, Object>>> getAllItems() throws SQLException {

		logger.info("getAllItems start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append(" SELECT ");
			sql.append(" feedback_id ");
			sql.append(" , contents ");
			sql.append(" , st_y(geom) lat ");
			sql.append(" , st_x(geom) lon ");
			sql.append(" , to_char(input_date,'yyyy/MM/dd hh:mm:ss') input_date ");
			sql.append(" , to_char(completed_date,'yyyy/MM/dd hh:mm:ss') completed_date ");
			sql.append(" , comments_from_office ");
			sql.append(" FROM feedbacks ");
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
