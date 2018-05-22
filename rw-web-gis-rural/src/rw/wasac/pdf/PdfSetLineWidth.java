package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfSetLineWidth class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfSetLineWidth extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfSetLineWidth() {
		super("setLineWidth");
	}

	/**
	 * To set width of line
	 * the parameters are as follows。
	 * <br>method:setLineWidth
	 * <br>linewidth:width of line
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		Float linewidth = Float.valueOf(CmdParams.get("linewidth"));
		cb.setLineWidth(linewidth);
	}

}
