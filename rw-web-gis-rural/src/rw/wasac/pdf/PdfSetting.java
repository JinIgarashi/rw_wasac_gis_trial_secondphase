package rw.wasac.pdf;

import java.io.File;
import java.util.HashMap;

import javax.servlet.ServletContext;

import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;

import net.arnx.jsonic.JSON;

/**
 * PdfSetting class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfSetting {

	/**
	 * a path of folder for exporting
	 */
	private String exportPath = "";

	/**
	 * To get a path of folder for exporting
	 * @return a path of folder for exporting
	 */
	public String getExportPath(){
		return exportPath;
	}

	/**
	 * a real path of foloder for exporting
	 */
	private String exportRealPath = "";

	/**
	 * To get a real path of foloder for exporting
	 * @return a real path of foloder for exporting
	 */
	public String getExportRealPath(){
		return exportRealPath;
	}


	/**
	 * a path of JSON layout setting file for PDF format
	 */
	private String jsonLayoutPath ="";

	/**
	 * To get a path of JSON layout setting file for PDF format
	 * @return a path of JSON layout setting file for PDF format
	 */
	public String getJsonLayoutPath(){
		return jsonLayoutPath;
	}

	/**
	 * a path of mapfile for Mapserver
	 */
	private String mapfile = "";

	/**
	 * To get a path of mapfile for Mapserver
	 * @return a path of mapfile for Mapserver
	 */
	public String getMapfile(){
		return mapfile;
	}

	/**
	 * a list of layers to be visible
	 */
	private String layers = "";

	/**
	 * To get a list of layers to be visible
	 * @return a list of layers to be visible
	 */
	public String getLayers(){
		return layers;
	}

	/**
	 * page size of PDF. Default is A4
	 */
	private Rectangle pageSize = PageSize.A4;
	
	/**
	 * To get page size of PDF
	 * @return page size of PDF. Default is A4
	 */
	public Rectangle getPageSize(){
		return pageSize;
	}

	/**
	 * width of map in PDF
	 */
	private Integer mapWidth = 0;
	/**
	 * To get width of map in PDF
	 * @return width of map in PDF
	 */
	public Integer getMapWidth(){
		return this.mapWidth;
	}

	/**
	 * height of map in PDF
	 */
	private Integer mapHeight = 0;
	
	/**
	 * To get height of map in PDF
	 * @return height of map in PDF
	 */
	public Integer getMapHeight(){
		return  this.mapHeight;
	}

	/**
	 * Constructor
	 * @param config JSON format for PDF layout settings
	 * @param sc ServletContext
	 */
	public PdfSetting(String config,ServletContext sc){
		HashMap<String,String> map = JSON.decode(config);

		exportPath = map.get("exportPath");
		exportRealPath = sc.getRealPath(exportPath);
		//Create folder for exporting if it does not exist
		File exportFile = new File(exportRealPath);
		if (!exportFile.exists()){
			exportFile.mkdir();
		}

		mapfile = map.get("mapfile");
		layers = map.get("layers");
		jsonLayoutPath = sc.getRealPath(map.get("jsonLayoutPath"));

		/*String size = map.get("pageSize");
		if (size.equals("A4_LANDSCAPE")){
			pageSize = PageSize.A4_LANDSCAPE;
		}else if(size.equals("A3")){
			pageSize = PageSize.A3;
		}*/

		this.mapWidth =Integer.valueOf(map.get("mapWidth"));
		this.mapHeight = Integer.valueOf(map.get("mapHeight"));

	}

}
