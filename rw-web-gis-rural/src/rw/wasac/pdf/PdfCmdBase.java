package rw.wasac.pdf;

import java.util.HashMap;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfCmdBase class<br>
 * This is the super class for running command of iText
 * @version 1.00
 * @author Igarashi
 *
 */
public abstract class PdfCmdBase {

	/**
	 * Name of method
	 */
	private String MethodName = "";

	/**
	 * Parameters of command
	 */
	protected HashMap<String,String> CmdParams = null;

	/**
	 * Get method name
	 * @return method name
	 */
	public String getMethodName(){
		return this.MethodName;
	}

	/**
	 * Set parameter of command
	 * @param params hashmap of command name and parameters
	 * <br>To set parameter as JSON object each command in setting text file.
	 * <br>Refer to sub class about details operation each command.
	 * <br>Example）
	 * <br>If you want to put line until coordinate(288,51), you can set command as follows.
	 * <br>{"method":"lineTo","x":"288","y":"51"}
	 */
	public void setCmdParams(HashMap<String,String> params){
		this.CmdParams = params;
	}

	/**
	 * Constructor
	 * @param method Name of method
	 */
	public PdfCmdBase(String method){
		this.MethodName = method;
	}

	/**
	 * Running command
	 * @param cb target PdfContentByte object
	 * @throws Exception Error
	 */
	public abstract void execute(PdfContentByte cb) throws Exception;

	/**
	 * transfering mm to pixel
	 * @param mm mm value
	 * @return pixel value
	 */
	protected float mm2pixel(final float mm){
        //1インチ = 25.4 ミリメートル
        return (mm / 25.4f ) * 72.0f;
    }

	/**
	 * transfering pixel to mm
	 * @param pixel pixel value
	 * @return mm value
	 */
	protected float pixel2mm(final float pixel){
        //1インチ = 25.4 ミリメートル
        return (pixel / 72.0f) * 25.4f;
    }

}
