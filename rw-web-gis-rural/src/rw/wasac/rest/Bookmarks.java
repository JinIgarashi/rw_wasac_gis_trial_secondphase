package rw.wasac.rest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.common.ServletListener;

/**
 * Bookmarks
 * @version 1.00
 * @author Igarashi
 */
@Path("/Bookmarks")
public class Bookmarks {
	private final Logger logger = LogManager.getLogger(Bookmarks.class);
	
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String,Object> get(@PathParam("id") String id) throws SQLException {

		logger.info("get start.id:" + id);
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			sql.append("select * from bookmarks where id=?");
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, id);
			ResultSet rs = pstmt.executeQuery();
			HashMap<String,Object> bm = null;
			while(rs.next()){
				Double[] coord = (Double[])rs.getArray("latlng").getArray();
				bm = new HashMap<String,Object>();
				bm.put("id",rs.getString("id"));
				bm.put("name",rs.getString("name"));
				bm.put("latlng",Arrays.asList(coord));
				bm.put("zoom",rs.getInt("zoom"));
				bm.put("removable",rs.getBoolean("removable"));
				bm.put("editable",rs.getBoolean("editable"));
			}
			
			return bm;
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
	
	@PUT
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String,Object> put(
			@PathParam("id") String id,
			@FormParam("name") String name,
			@FormParam("latlng[]") List<Double> latlng,
			@FormParam("zoom") Integer zoom,
			@FormParam("editable") Boolean editable,
			@FormParam("removable") Boolean removable
			) throws SQLException {

		logger.info("put start.id:" + id);
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");
			String strlatlng = "'{" + latlng.get(0).toString() + "," + latlng.get(1).toString() + "}'";
			sql.append(" INSERT INTO public.bookmarks(id, name, latlng, zoom, editable, removable)VALUES (?, ?, " + strlatlng + ", ?, ?, ?) ");
			sql.append(" ON CONFLICT ON CONSTRAINT bookmarks_pkey ");
			sql.append(" DO UPDATE SET name = ?, latlng=" + strlatlng + ", zoom=?, editable=?, removable=? ");
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, id);
			pstmt.setString(2, name);
			pstmt.setInt(3, zoom);
			pstmt.setBoolean(4, editable);
			pstmt.setBoolean(5, removable);
			pstmt.setString(6, name);
			pstmt.setInt(7, zoom);
			pstmt.setBoolean(8, editable);
			pstmt.setBoolean(9, removable);
			int result = pstmt.executeUpdate();
			if (result > 0){
				return this.get(id);
			}
			return null;
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
	
	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public HashMap<String,Object> delete(@PathParam("id") String id) throws SQLException {

		logger.info("delete start.id:" + id);
		Connection conn = null;
		try{
			HashMap<String,Object> bookmark = this.get(id);
			
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");

			sql.append("delete from bookmarks where id=?");
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, id);
			pstmt.executeUpdate();	
			return bookmark;
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
	public ArrayList<HashMap<String,Object>> getAllItems() throws SQLException {

		logger.info("getAllItems start.");
		Connection conn = null;
		try{
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(ServletListener.dburl, ServletListener.dbuser,ServletListener.dbpassword);
			StringBuffer sql = new StringBuffer("");

			sql.append("select * from bookmarks");
			PreparedStatement pstmt = conn.prepareStatement(sql.toString());
			ResultSet rs = pstmt.executeQuery();
			ArrayList<HashMap<String,Object>> bookmarks = new ArrayList<HashMap<String,Object>>();
			while(rs.next()){
				Double[] coord = (Double[])rs.getArray("latlng").getArray();
				HashMap<String,Object> bm = new HashMap<String,Object>();
				bm.put("id",rs.getString("id"));
				bm.put("name",rs.getString("name"));
				bm.put("latlng",Arrays.asList(coord));
				bm.put("zoom",rs.getInt("zoom"));
				bm.put("removable",rs.getBoolean("removable"));
				bm.put("editable",rs.getBoolean("editable"));
				bookmarks.add(bm);
			}
			return bookmarks;
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
