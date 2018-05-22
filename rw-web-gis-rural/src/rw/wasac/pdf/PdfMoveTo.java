package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfMoveTo
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfMoveTo extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfMoveTo() {
		super("moveTo");
	}

	/**
	 * To set starting position of drawing line
	 * the parameters are as follows。
	 * <br>method:moveTo
	 * <br>x:x-coodiante. unit is mm
	 * <br>y:y-coodiante. unit is mm
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		Float x = Float.valueOf(CmdParams.get("x"));
		Float y = Float.valueOf(CmdParams.get("y"));
		cb.moveTo(mm2pixel(x), mm2pixel(y));
	}

}
