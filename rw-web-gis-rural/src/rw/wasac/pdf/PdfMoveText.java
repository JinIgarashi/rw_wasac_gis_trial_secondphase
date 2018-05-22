package rw.wasac.pdf;

import com.itextpdf.text.pdf.PdfContentByte;

/**
 * PdfMoveText class
 * @version 1.00
 * @author Igarashi
 *
 */
public class PdfMoveText extends PdfCmdBase {

	/**
	 * Constructor
	 */
	public PdfMoveText() {
		super("moveText");
	}

	/**
	 * To set starting position of drawing text
	 * the parameters are as follows
	 * <br>method:moveText
	 * <br>x:x-coodiante of bottom-left. unit is mm
	 * <br>y:y-coodiante of bottom-left. unit is mm
	 */
	@Override
	public void execute(PdfContentByte cb) throws Exception{
		Float x = Float.valueOf(CmdParams.get("x"));
		Float y = Float.valueOf(CmdParams.get("y"));
		cb.moveText(mm2pixel(x), mm2pixel(y));
	}

}
