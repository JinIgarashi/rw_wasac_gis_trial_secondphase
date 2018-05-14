package rw.wasac.rest;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import rw.wasac.epanet.CoordinateList;
import rw.wasac.epanet.Options;
import rw.wasac.epanet.PipeList;
import rw.wasac.epanet.PumpList;
import rw.wasac.epanet.ReservoirList;
import rw.wasac.epanet.TankList;

/**
 * Epanet
 * @version 1.00
 * @author Igarashi
 */
@Path("/Epanet")
public class Epanet {
	private final Logger logger = LogManager.getLogger(Epanet.class);
	
	/**
	 * To get INP file of epanet from GIS data
	 * @param wss_id WSS ID which require to export epanet format.
	 * @return INP file of epanet
	 * @throws SQLException SQL error
	 */
	@GET
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response get(@QueryParam("wss_id") Integer wss_id) throws SQLException {

		logger.info("get start.");
		logger.info("wss_id:" + wss_id);
		Connection conn = null;
		try{
			CoordinateList coords = new CoordinateList(wss_id);
			coords.getData();
			
			ReservoirList reservoirList = new ReservoirList(wss_id, coords);
			reservoirList.getData();
			
			TankList tankList = new TankList(wss_id, coords);
			tankList.getData();
			
			PipeList pipeList = new PipeList(wss_id,coords);
			pipeList.getData();
			
			PumpList pumpList = new PumpList(wss_id,coords,pipeList);
			pumpList.getData();
			
			Options options = new Options();
			
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
		    OutputStreamWriter osw = new OutputStreamWriter(baos, "UTF-8");
		    
		    coords.export_junctions(osw);
		    reservoirList.export(osw);
		    tankList.export(osw);
		    pipeList.export(osw);
		    pumpList.export(osw);
		    options.export(osw);
		    coords.export_coordinates(osw);

		    osw.flush();
		    osw.close();
			
		    return Response.status(Status.OK)
		    		.entity(baos.toString())
		    		.header("Content-disposition", String.format("attachment; filename=%s_pipe_junction.inp",wss_id))
		    		.build();
		    
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
