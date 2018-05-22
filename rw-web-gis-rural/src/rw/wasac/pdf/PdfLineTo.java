package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfLineTo
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfLineTo extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfLineTo() {
		super("lineTo");
	}

	/**
	 * To draw line until target coordinate
	 * the parameters are as follows
	 * <br>method:lineTo
	 * <br>x:x-coordinate, unit is mm.
	 * <br>y:y-coordinate, unit is mm.
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		Float x = Float.valueOf(CmdParams.get("x"));
		Float y = Float.valueOf(CmdParams.get("y"));
		cb.lineTo(mm2pixel(x), mm2pixel(y));
	}

}
