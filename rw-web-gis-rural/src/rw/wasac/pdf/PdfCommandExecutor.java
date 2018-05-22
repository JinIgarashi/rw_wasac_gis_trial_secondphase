package rw.wasac.pdf;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;

import net.arnx.jsonic.JSON;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.itextpdf.text.Document;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * PdfCommandExecutor
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfCommandExecutor {
	private final Logger logger = LogManager.getLogger(PdfCommandExecutor.class);

	private PdfContentByte cb;
	
	/**
	 * a path of PDF for exporting
	 */
	private String FileName = "";
	
	/**
	 * a path of JSON file for PDF settings
	 */
	private String LayoutFilePath = "";
	
	/**
	 * a size of PDF
	 */
	private Rectangle PageSize = null;
	
	/**
	 * a list of text parameters which will be replaced from PDF settings
	 */
	private HashMap<String,String> MapParams = null;

	/**
	 * Array of PdfCmdBase class object of commanding on PDF creator
	 */
	private PdfCmdBase[] CommandObjArray = null;

	/**
	 * Constructor
	 * @param filename a path of PDF for exporting
	 * @param setting a setting object of JSON file for PDF settings
	 * @param params a list of text parameters which will be replaced from PDF settings
	 */
	public PdfCommandExecutor(String filename,PdfSetting setting,HashMap<String,String> params){
		this.FileName = filename;
		this.LayoutFilePath = setting.getJsonLayoutPath();
		this.PageSize = setting.getPageSize();
		this.MapParams = params;

		//使用するコマンドオブジェクトを設定
		CommandObjArray = new PdfCmdBase[]{
				new PdfBeginText(),
				new PdfSetFontAndSize(),
				new PdfMoveText(),
				new PdfShowText(),
				new PdfShowTextAligned(),
				new PdfEndText(),
				new PdfAddImage(),
				new PdfMoveTo(),
				new PdfLineTo(),
				new PdfSetLineWidth(),
				new PdfStroke()};
	}

	/**
	 * To create PDF
	 * @throws Exception Error
	 */
	public void create() throws Exception{
		Document document = new Document(this.PageSize,0,0,0,0);
		try {
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(FileName));
			document.open();
			cb = writer.getDirectContent();

			String layouttext = readTextFile(LayoutFilePath);
			layouttext = replaceParam(layouttext);

			ArrayList<Object> params = JSON.decode(layouttext);
			for (Object prm:params){
				String jsonprm = JSON.encode(prm);
				draw(jsonprm);
			}

		}finally{
			if (document != null && document.isOpen()){
				document.close();
				document = null;
			}
		}
	}

	/**
	 * To replace parameter of new text from layout setting file. old text should be written between '%' on JSON file
	 * @param layouttext JSON setting
	 * @return JSON setting after replacing parameters
	 */
	private String replaceParam(String layouttext){
		if (MapParams != null){
			//パラメータでhtml内の指定文字列を置き換え
			for (String key:MapParams.keySet()){
				layouttext = layouttext.replaceAll("%" + key + "%", MapParams.get(key));
			}
		}
		return layouttext;
	}

	/**
	 * To draw PDF
	 * @param param Parameters of JSON format.
	 * @throws Exception Error
	 */
	private void draw(String param) throws Exception{
		logger.debug("draw param:" + param);
		HashMap<String,String> map = JSON.decode(param);
		String method = map.get("method");

		PdfCmdBase execcmd = null;

		for (PdfCmdBase cmd:CommandObjArray){
			if (cmd.getMethodName().equals(method)){
				execcmd = cmd;
			}
		}

		execcmd.setCmdParams(map);
		execcmd.execute(cb);

	}

	/**
	 * To load text file to memory
	 * @param filename a path of file
	 * @return text after loading from file
	 * @throws IOException IO Error
	 */
	private String readTextFile(String filename) throws IOException {
		logger.info("readTextFile start.");
		logger.debug("filename:" + filename);

		BufferedReader br = null;
		String resultString = "";
        try {
            //file for loading
            File file = new File(filename);

            br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
            String line;
            while ((line = br.readLine()) != null) {
            	resultString += line;
            }
        } finally {
        	if (br != null ){
        		br.close();
        	}
        }
        return resultString;
	}
}
